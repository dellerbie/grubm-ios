Ext.define('Grubm.view.FindFoodNavigationView', {
  extend: 'Ext.navigation.View',
  xtype: 'findfoodnavview',
  requires: [
    'Grubm.view.SearchBar',
    'Grubm.view.CityPicker',
    'Grubm.view.Images'
  ],
  config: {
    ui: 'find-food',
    autoDestroy: false,
    navigationBar: {
      ui: 'grubm',
      items: [{ 
        xtype: 'searchbar', 
        width: '80%',
        align: 'right',
        hidden: true
      }]
    },
    items:[{
      xtype: 'citypickerview'
    }]
  }
});