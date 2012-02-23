Ext.define('Grubm.model.Image', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'url'
    },{
      name: 'description'
    },{
      name: 'business'
    },{
    	name: 'width',
      type: 'int'
    },{
    	name: 'height',
      type: 'int'
    }]    
  }
});