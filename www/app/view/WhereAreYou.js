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
        width: '70%',
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
        	'<p class="place">',
        	  '<tpl if="name">{name}</tpl>',
        	  '<tpl if="terms">',
        	    '<tpl for="terms">',
        	      '{value}',
        	      '{% if (xindex == 1) break; %}',
        	    '</tpl>',
        	  '</tpl>',
        	'</p>',
        	'<span class="category">',
          	'<tpl for="terms">',
        	    '{[(xindex == 2 || xindex == 3 || xindex == 4) ? values.value + " &#8226; " : ""]}',
          	'</tpl>',
        	'</span>',
        '</div>'
      ),
      emptyText: "Couldn't find any places. Try a different search",
      deferEmptyText: true
    }]
  }
});