Ext.define('Grubm.view.Login', {
	extend: 'Ext.Panel',
  xtype: 'loginview',
  config: {
  	fullscreen: true,
    layout: {
    	type: 'vbox',
      pack: 'center'
    },
    items: [{
    	xtype: 'toolbar',
      docked: 'top',
      title: 'Grubm'
    },{
    	xtype: 'button',
      ui: 'action',
      text: 'Login with Facebook',
      icon: 'resources/images/facebook4.png',
      iconAlign: 'center'
    }]
  }
});