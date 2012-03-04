Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.dataview.DataView',
  requires: ['Grubm.store.MyImages'],
  xtype: 'myphotostab',
  config: {
    ui: 'images-view my-images',
    store: 'MyImages',
    plugins: [{ 
      xclass: 'Ext.plugin.PullRefresh',
      refreshFn: function(plugin) {
        Ext.getStore('MyImages').load({
          params: {
            access_token: Ext.getStore('User').first().get('accessToken'), 
            oauth_provider: 'facebook'
          }
        })
      }
    }],
    itemTpl: new Ext.XTemplate(
      '<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});