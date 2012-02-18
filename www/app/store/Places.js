Ext.define('Grubm.store.Places', {
  extend: 'Ext.data.JsonStore',
  fields: ['name', 'geometry', 'types', 'reference', 'street', 'city', 'state', 'phone']
});