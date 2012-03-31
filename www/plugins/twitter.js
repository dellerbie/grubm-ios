// PROJECT: Phonegap Twitter with ChildBrowser
// AUTHOR: Drew Dahlman ( www.drewdahlman.com )
// DATE: 1.25.2012

/* 
NOTES:
We will use the ChildBrowser to get a user to sign in to Twitter.
We will store this information in our localStorage and be able to reuse this when we need!

You can read into this more, but storing these keys like this is VERY dangerous!!
So make sure you don't share your source code until you've removed your keys and secrets!
*/

var Twitter = {
  options: { 
    consumerKey: 'AMc9zbuqNjjnlhjSXaHA', 
    consumerSecret: '0TgXnrdDR6Vi7QeC48uWN36fblke6E49tmJ40YDQAUI', 
    callbackUrl: "http://grubm.com" 
  },
  
	/*
	When The ChildBrowser URL changes we will track it here.
	We will also determine if the request was a success or not here
	*/
	login:function(success, failure){
	  console.log('twitter login');
		var cb = ChildBrowser.install();
		var twitterKey = "twttrKey";

    var oauth = OAuth(this.options);
    oauth.get('https://api.twitter.com/oauth/request_token',
      function(data) {
        var requestParams = data.text;
        cb.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text); // This opens the Twitter authorization / sign in page     
        cb.onLocationChange = function(loc) { 
          if (loc.indexOf("http://grubm.com/?") >= 0) {
            // Parse the returned URL
            var index, verifier = '';            
            var params = loc.substr(loc.indexOf('?') + 1);

            params = params.split('&');
            for (var i = 0; i < params.length; i++) {
             var y = params[i].split('=');
             if(y[0] === 'oauth_verifier') {
               verifier = y[1];
             }
            }

            oauth.get('https://api.twitter.com/oauth/access_token?oauth_verifier='+verifier+'&'+requestParams,
               function(data) {               
                 var accessParams = {};
                 var qvars_tmp = data.text.split('&');
                 for (var i = 0; i < qvars_tmp.length; i++) {
                   var y = qvars_tmp[i].split('=');
                   accessParams[y[0]] = decodeURIComponent(y[1]);
                 }

                 oauth.setAccessToken([accessParams.oauth_token, accessParams.oauth_token_secret]);

                 // Save access token/key in localStorage
                 var accessData = {};
                 accessData.accessTokenKey = accessParams.oauth_token;
                 accessData.accessTokenSecret = accessParams.oauth_token_secret;

                 // SETTING OUR LOCAL STORAGE
                 console.log("TWITTER: Storing token key/secret in localStorage");
                 localStorage.setItem(twitterKey, JSON.stringify(accessData));

                 oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true', success, failure);

                 // Since everything went well we can close our childBrowser!                             
                 window.plugins.childBrowser.close();
             },
             function(data) { 
               console.log(data);
             }
            );
          }
        }; 
      },
      function(data) { 
        console.log("ERROR: "+data);
      }
    );
	},
	tweet:function(){
		var storedAccessData, rawData = localStorage.getItem(twitterKey);
		
		storedAccessData = JSON.parse(rawData); // Parse our JSON object
		this.options.accessTokenKey = storedAccessData.accessTokenKey; // This is saved when they first sign in
		this.options.accessTokenSecret = storedAccessData.accessTokenSecret; // this is saved when they first sign in
		
		// jsOAuth takes care of everything for us we just need to provide the options
		oauth = OAuth(this.options);
		oauth.get('https://api.twitter.com/1/account/verify_credentials.json?skip_status=true',
				function(data) {
					var entry = JSON.parse(data.text);
					Twitter.post();
				}
		);
	},
	/*
	Now that we have the information we can Tweet!
	*/
	post:function(){
		var theTweet = $("#tweet").val(); // Change this out for what ever you want!
		
		oauth.post('https://api.twitter.com/1/statuses/update.json',
                    { 'status' : theTweet,  // jsOAuth encodes for us
                      'trim_user' : 'true' },
                    function(data) {
                        var entry = JSON.parse(data.text);
						console.log(entry);
						
						// FOR THE EXAMPLE
						app.done();
                    },
                    function(data) { 
						console.log(data);
                    }
            );		
	}
};