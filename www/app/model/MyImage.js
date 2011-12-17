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
    mapping: 'original_width'
  },{
  	name: 'height',
    type: 'int',
    mapping: 'original_height'
  }]
});