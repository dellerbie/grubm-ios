Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'imagesview',
  config: {
    ui: 'images-view',
    store: 'Images',
    loadingText: '',
    limit: 30,
    plugins: [{
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