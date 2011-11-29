Ext.define('Grubm.model.Image', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'url', 
    type: 'string'
  },{
    name: 'description',
    type: 'string'
  },{
    name: 'business'
  },{
  	name: 'width',
    type: 'int'
  },{
  	name: 'height',
    type: 'int'
  }]
});