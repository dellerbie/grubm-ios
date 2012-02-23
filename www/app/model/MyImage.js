Ext.define('Grubm.model.MyImage', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
    	name: 'id'
    },{
      name: 'description'
    },{
      name: 'url'
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