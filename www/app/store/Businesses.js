Ext.define('Grubm.store.Businesses', {
  extend: 'Ext.data.Store',
  requires: ['Grubm.model.Business'],
  config: {
    model   : 'Grubm.model.Business',
    proxy: {
      type: 'jsonp',
      url: 'http://la.grubm.com/business/.json'
    },
    autoload: false
  }
});