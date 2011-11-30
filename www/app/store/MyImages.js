Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  model   : 'Grubm.model.Image',
  requires: ['Grubm.model.Image'],
  proxy: {
    type: 'jsonp',
    url: 'http://la.grubm.com/.json'
  },
  autoLoad: true
});