Ext.define('Grubm.view.SearchBar', {
  extend: 'Ext.field.Search',
  xtype: 'searchbar',
  config: {
    placeHodler: 'Search',
    useClearIcon: true,
    name: 'q',
    listeners: {
      action: function() {
        Ext.getStore('Images').getProxy().setExtraParams({
          q: this.getValue()
        });
        Ext.getStore('Images').load();
      },
      clearicontap: function() {
        Ext.getStore('Images').getProxy().setExtraParams({
          q: ''
        })
        Ext.getStore('Images').load();
      }
    }
  }
});