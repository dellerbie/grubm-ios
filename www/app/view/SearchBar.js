Ext.define('Grubm.view.SearchBar', {
  extend: 'Ext.field.Search',
  xtype: 'searchbar',
  config: {
    placeHodler: 'Search',
    useClearIcon: true,
    name: 'q',
    listeners: {
      action: function() {
        Ext.getStore('Images').load({
          params: {
            q: this.getValue()
          }
        });
      },
      clearicontap: function() {
        Ext.getStore('Images').load();
      }
    }
  }
});