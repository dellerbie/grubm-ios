Ext.define('Grubm.view.MoreBusinessPhotos', {
	extend: 'Ext.DataView',
  requires: ['Grubm.store.Businesses'],
  xtype: 'morebusinessphotos',
  config: {
  	store: 'Businesses',
    itemTpl: new Ext.XTemplate(
    	'<tpl for="business"><h3>More Photos from {name}</h3></tpl>',
    	'<tpl for="images">',
      	'<div class="image" style="background: url({url}) no-repeat; "></div>',
      '</tpl>'
    ),
    ui: 'business-images',
    emptyText: "This business doesn't have any more photos",
    deferEmptyText: true,
    height: 300
  }
});