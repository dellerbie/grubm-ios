Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.dataview.DataView',
  requires: [
    'Grubm.store.MyImages',
    'Grubm.plugin.ListPaging'
  ],
  xtype: 'myphotostab',
  config: {
    ui: 'images-view my-images',
    store: 'MyImages',
    loadingText: '',
    limit: 32,
    plugins: [{ 
      xclass: 'Ext.plugin.PullRefresh'
    },{
      xclass: 'Ext.plugin.ListPaging'
    }],
    itemTpl: new Ext.XTemplate(
      '<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});