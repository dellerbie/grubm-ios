Ext.define('Grubm.model.MyImage', {
  extend: 'Ext.data.Model',
  fields: [{
  	name: 'id'
  },{
    name: 'url', 
    type: 'string'
  },{
    name: 'description',
    type: 'string'
  },{
    name: 'business'
  },{
  	name: 'width',
    type: 'int',
    mapping: 'small_width'
  },{
  	name: 'height',
    type: 'int',
    mapping: 'small_height'
  }]
});