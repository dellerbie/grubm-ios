Ext.define('Grubm.model.City', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'name',
      type: 'string'
    },{
      name: 'url',
      type: 'string'
    }]
  }
});