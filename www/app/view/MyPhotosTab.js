Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.dataview.DataView',
  requires: ['Grubm.store.MyImages'],
  xtype: 'myphotostab',
  config: {
    ui: 'images-view',
    store: 'MyImages',
    itemTpl: new Ext.XTemplate(
    	'<div class="image" style="background: url({url}) no-repeat;"></div>'
    )
  }
});