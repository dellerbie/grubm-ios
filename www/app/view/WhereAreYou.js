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
      xtype: 'list',
      store: 'Places',
      itemTpl: '{name}'
    }]
  }
});