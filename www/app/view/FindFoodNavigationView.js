Ext.define('Grubm.view.FindFoodNavigationView', {
  extend: 'Ext.navigation.View',
  xtype: 'findfoodnavview',
  requires: [
    'Grubm.view.SearchBar',
    'Grubm.view.CityPicker',
    'Grubm.view.Images'
  ],
  config: {
    navigationBar: {
      items: [{ 
        xtype: 'searchbar', 
        align: 'right',
        hidden: true
      }]
    },
    items:[{
      xtype: 'citypickerview'
    }]
  }
});