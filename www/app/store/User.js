Ext.define('Grubm.store.User', {
  extend: 'Ext.data.Store',
  requires: ['Grubm.model.User'],
  config: {
    model: 'Grubm.model.User'
  }
});