Ext.define('Grubm.store.Businesses', {
  extend: 'Ext.data.Store',
  fields:['business', 'images'],
  proxy: {
    type: 'jsonp',
    url: 'http://la.grubm.com/business/.json'
  },
  autoload: false
});