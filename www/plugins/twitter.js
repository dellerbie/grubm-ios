var Twitter = {
  options: { 
    consumerKey: 'AMc9zbuqNjjnlhjSXaHA', 
    consumerSecret: '0TgXnrdDR6Vi7QeC48uWN36fblke6E49tmJ40YDQAUI', 
    callbackUrl: "http://grubm.com" 
  },
  
  twitterKey: "twttrKey",
  
	login:function(success, failure){
	  console.log('twitter login');
		var cb = ChildBrowser.install();

    var oauth = OAuth(this.options);
    oauth.get('https://api.twitter.com/oauth/request_token',
      function(data) {
        var requestParams = data.text;
        cb.showWebPage('https://api.twitter.com/oauth/authorize?'+data.text); // This opens the Twitter authorization / sign in page     
        cb.onLocationChange = function(loc) { 
          if (loc.indexOf("http://grubm.com/?") >= 0) {
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
	
	post: function(msg, success, failure) {
	  console.log('inside post');
	  var rawData = localStorage.getItem(this.twitterKey),
	      storedAccessData = JSON.parse(rawData);
	      
	  console.log(20);
		this.options.accessTokenKey = storedAccessData.accessTokenKey;
		console.log(21);
		this.options.accessTokenSecret = storedAccessData.accessTokenSecret; 
		console.log(22);
		var oauth = OAuth(this.options);
		console.log(23);
		oauth.post('https://api.twitter.com/1/statuses/update.json', {
		  "status": msg,
		  "trim_user": 'true'
		}, success, failure);
		console.log(24);
	}
};