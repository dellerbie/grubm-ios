Ext.define('Grubm.view.WhereAreYou', {
	extend: 'Ext.Panel',
  xtype: 'whereareyou',
  config: {
    layout: 'fit',
    title: 'Where are you?',
  	items: [{
    	xtype: 'toolbar',
      docked: 'top',
      items:[{
        xtype: 'searchfield', 
        placeHolder: 'Where are you?',
        useClearIcon: true,
        name: 'search'
      },{
        text: 'Cancel',
        id: 'cancelSelectLocation'
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