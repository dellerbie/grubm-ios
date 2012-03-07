Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'imagesview',
  config: {
    ui: 'images-view',
    store: 'Images',
    loadingText: '',
    itemTpl: new Ext.XTemplate(
    	'<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});