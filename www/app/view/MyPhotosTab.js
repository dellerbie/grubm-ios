Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.dataview.DataView',
  requires: ['Grubm.store.MyImages'],
  xtype: 'myphotostab',
  config: {
    ui: 'images-view my-images',
    store: 'MyImages',
    loadingText: '',
    limit: 30,
    plugins: [{ 
      xclass: 'Ext.plugin.PullRefresh'
    },{
      xclass: 'Ext.plugin.ListPaging',
      loadTpl: [
        '<div class="{cssPrefix}list-paging-msg">{message}</div>'
      ].join('')
    }],
    itemTpl: new Ext.XTemplate(
      '<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});