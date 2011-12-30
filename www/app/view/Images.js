Ext.define('Grubm.view.Images', {
  extend: 'Ext.dataview.DataView',
  xtype: 'imagesview',
  config: {
    ui: 'images-view',
    store: 'Images',
    itemTpl: new Ext.XTemplate(
    	'<div class="image"><img src="{url}" width="69" height="69" /></div>'
    )
  }
});