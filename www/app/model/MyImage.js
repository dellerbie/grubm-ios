Ext.define('Grubm.model.MyImage', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
    	name: 'id'
    },{
      name: 'description'
    },{
      name: 'url',
      type: 'string',
      mapping: 'small_url'
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
  }
});