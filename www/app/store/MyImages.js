Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    proxy: {
      type: 'jsonp',
      url: 'http://192.168.1.76:3000/v1/images.json'
      //		url: "http://grubm.com/v1/images.json"
    },
    autoLoad: false 
  }
});