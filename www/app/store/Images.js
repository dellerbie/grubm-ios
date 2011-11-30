Ext.define('Grubm.store.Images', {
  extend  : 'Ext.data.Store',
  model   : 'Grubm.model.Image',
  requires: ['Grubm.model.Image'],
  proxy: {
    type: 'jsonp',
    url: 'http://la.grubm.com/.json'
  },
  autoLoad: false
});