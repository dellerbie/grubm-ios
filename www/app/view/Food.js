Ext.define('Grubm.view.Food', {
  extend: 'Ext.Container',
  xtype: 'foodview',
  requires: [
    'Grubm.view.SearchBar',
    'Grubm.view.Images'
  ],
  config: {
    layout: 'hbox',
    items: [{
      docked: 'top',
      xtype: 'searchbar'
    },{
      xtype: 'imagesview',
      flex: 1
    }]
  }
});