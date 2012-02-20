Ext.define('Grubm.model.MyImage', {
  extend: 'Ext.data.Model',
  fields: [{
  	name: 'id'
  },{
    name: 'url',
    type: 'string',
    mapping: 'small_url'
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
  },{
  	name: 'originalWidth',
    type: 'int',
    mapping: 'original_width'
  },{
  	name: 'originalHeight',
    type: 'int',
    mapping: 'original_height'
  }]
});