Ext.define('Grubm.view.SearchBar', {
  extend: 'Ext.field.Search',
  xtype: 'searchbar',
  config: {
    placeHodler: 'Search',
    useClearIcon: true,
    name: 'q'
  }
});