Ext.define('Grubm.store.Places', {
  extend: 'Ext.data.JsonStore',
  requires: ['Grubm.model.Place'],
  config: {
    model: 'Grubm.model.Place'
  }
});