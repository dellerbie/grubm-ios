Ext.define('Grubm.view.WhereAreYou', {
	extend: 'Ext.Panel',
  xtype: 'whereareyou',
  config: {
    layout: 'fit',
  	items: [{
    	xtype: 'toolbar',
      docked: 'top',
      layout: 'hbox',
      items:[{
      	flex: 1,
        xtype: 'searchfield', 
        placeHolder: 'Search for a place...',
        useClearIcon: true,
        name: 'search'
      }]
    },{
      xtype: 'dataview',
      store: 'Places',
      ui: 'places',
			itemTpl: new Ext.XTemplate(
      	'<div class="place-wrapper">',
        	'<p class="place">{name}</p>',
          '<tpl for="categories">',
          	'{% if (xindex > 2) break; %}',
          	'<p class="categories">{name} &#8226; </p>',
          '</tpl>',
        '</div>'
      ),
      emptyText: "Couldn't find any places. Try a different search",
      deferEmptyText: true
    }]
  }
});