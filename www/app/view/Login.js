Ext.define('Grubm.view.Login', {
	extend: 'Ext.Panel',
	xtype: 'loginview',
	config: {
		fullscreen: true,
		cls: 'login-panel',
		items: [{
			html: '<div class="facebook-login"></div>',
			bottom: 120,
			left: 32
		}, {
			html: '<div class="twitter-login"></div>',
			bottom: 60,
			left: 32
		}]
	},
	initialize: function() {
		this.callParent();
		var me = this;
		var fbBtn = me.element.down('.facebook-login'),
		    twBtn = me.element.down('.twitter-login');
		    
		fbBtn.on({
			scope: me,
			tap: function(e, t) {
				me.fireEvent('fbtap', me, me.getComponent('fb-login-btn'), e, t);
			}
		});
		
		twBtn.on({
			scope: me,
			tap: function(e, t) {
				me.fireEvent('twtap', me, me.getComponent('tw-login-btn'), e, t);
			}
		});
	}
});