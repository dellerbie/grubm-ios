Ext.define('Grubm.model.Business', {
  extend: 'Ext.data.Model',
  requires: ['Grubm.model.Image'],
  fields: [{
    name: 'name',
    type: 'string'
  },{
    name: 'normalized_name',
    type: 'string'
  },{
    name: 'city',
    type: 'string'
  },{
    name: 'street',
    type: 'string'
  },{
    name: 'state',
    type: 'string'
  },{
    name: 'zip',
    type: 'string'
  }],
  hasMany: 'Grubm.model.Image'
});