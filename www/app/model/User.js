Ext.define('Grubm.model.User', {
  extend: 'Ext.data.Model',
  config: {
    fields: [{
      name: 'accessToken',
      type: 'string'
    },{
      name: 'secret',
      type: 'string'
    },{
      name: 'uid',
      type: 'string'
    },{
      name: 'email',
      type: 'string'
    },{
      name: 'oauthType',
      type: 'string'
    },{
    	name: 'firstName',
      type: 'string'
    },{
    	name: 'lastName',
      type: 'string'
    },{
    	name: 'gender',
      type: 'string'
    },{
    	name: 'email',
      type: 'string'
    }]
  }
});