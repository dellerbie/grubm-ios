Ext.define('Grubm.store.Images', {
  extend: 'Ext.data.Store',
  requires: ['Grubm.model.Image'],
  config: {
    model: 'Grubm.model.Image',
    proxy: {
      type: 'jsonp',
      url: 'http://la.grubm.com/.json'
    },
    autoLoad: false
  }
});