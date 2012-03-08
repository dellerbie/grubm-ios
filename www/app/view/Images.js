Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'imagesview',
  requires: [
    'Grubm.store.Images',
    'Grubm.plugin.ListPaging'
  ],
  config: {
    ui: 'images-view find-food',
    store: 'Images',
    loadingText: '',
    limit: 30,
    plugins: [{
      xclass: 'Ext.plugin.ListPaging',
      loadTpl: '<div class="{cssPrefix}list-paging-msg">{message}</div>'
    }],
    itemTpl: new Ext.XTemplate(
    	'<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});