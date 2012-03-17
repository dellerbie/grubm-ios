Ext.define('Grubm.view.CityPicker', {
  extend: 'Ext.dataview.List',
  xtype: 'citypickerview',
  config: {
    ui: 'citypicker',
    allowDeselect: true,
    store: 'Cities',
    itemTpl: '{name}'
  }
});