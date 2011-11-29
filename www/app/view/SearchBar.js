Ext.define('Grubm.view.SearchBar', {
  extend: 'Ext.Toolbar',
  xtype: 'searchbar',
  config: {
    defaults: {
      iconMask: true
    },
    items: [{
      ui: 'back',
      text: 'Back'
    },{ 
      xtype: 'searchfield', 
      placeHodler: 'Search',
      useClearIcon: true,
      name: 'q' ,
      onClearIconTap: function() {
        this.setValue('');
        this.hideClearIcon();
        this.fireEvent('searchclear');
      }
    }]
  }
});