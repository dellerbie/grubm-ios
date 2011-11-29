Ext.define('Grubm.view.CityPicker', {
  extend: 'Ext.dataview.List',
  xtype: 'citypickerview',
  config: {
    ui: 'citypicker',
    store: 'Cities',
    itemTpl: '{name}'
  }
});