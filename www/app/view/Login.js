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
    }]
  },
  afterRender: function() {
    this.callParent(arguments);
    var me = this;
    var fbBtn = me.getEl().down('.facebook-login');
    fbBtn.on({
      scope: me,
      tap: function(e, t) {
        me.fireEvent('fbtap', me, me.getComponent('fb-login-btn'), e, t);
      }
    });
  }
});