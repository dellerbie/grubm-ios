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
    limit: 32,
    plugins: [{
      xclass: 'Ext.plugin.ListPaging'
    }],
    itemTpl: new Ext.XTemplate(
    	'<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});