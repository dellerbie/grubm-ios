PG = ( typeof PG == 'undefined' ? {} : PG );
PG.normalize_session_date = function(session) {
	if (typeof session.expires === 'string') {
    var M, d, h, i, m, s, y, _ref;

    _ref = (function() {
      var _i, _len, _ref, _results;
      _ref = session.expires.split(/-|:|\s/);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(parseInt(i));
      }
      return _results;
    })();
    y = _ref[0], M = _ref[1], d = _ref[2], h = _ref[3], m = _ref[4], s = _ref[5];

    var integer_date = new Date(y, M, d, h, m, s).valueOf();
    console.log("Normalizing session.expires from '" + session.expires + "' to " + integer_date);
    session.expires = integer_date;
  }
};

PG.FB = {
    init: function(apiKey) {
        // create the fb-root element if it doesn't exist
        if (!document.getElementById('fb-root')) {
            var elem = document.createElement('div');
            elem.id = 'fb-root';
            document.body.appendChild(elem);
        }
        PhoneGap.exec(function() {
        	var session = JSON.parse(localStorage.getItem('pg_fb_session') || '{"expires":0}');
					PG.normalize_session_date(session);
        	if (session && session.expires > new Date().valueOf()) {
        		FB.Auth.setSession(session, 'connected');
          }
        }, null, 'com.phonegap.facebook.Connect', 'init', [apiKey]);
    },
    login: function(a, b) {
        b = b || { perms: '' };
        PhoneGap.exec(function(e) { // login
            localStorage.setItem('pg_fb_session', JSON.stringify(e.session));
            FB.Auth.setSession(e.session, 'connected');
            if (a) a(e);
        }, null, 'com.phonegap.facebook.Connect', 'login', b.perms.split(',') );
    },
    logout: function(cb) {
        PhoneGap.exec(function(e) {
            FB.Auth.setSession(null, 'notConnected');
            if (cb) cb(e);
        }, null, 'com.phonegap.facebook.Connect', 'logout', []);
    },
    getLoginStatus: function(cb) {
        PhoneGap.exec(function(e) {
            if (cb) cb(e);
        }, null, 'com.phonegap.facebook.Connect', 'getLoginStatus', []);
    }
};