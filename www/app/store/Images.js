Ext.define('Grubm.store.Images', {
  extend: 'Ext.data.Store',
  requires: ['Grubm.model.Image'],
  config: {
    model: 'Grubm.model.Image',
    proxy: {
      type: 'jsonp',
      url: 'http://la.grubm.com/.json',
      listeners: {
        exception: function(proxy, response, operation) {
          Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: "Couldn't get images",
            indicator: false
          });
          var task = new Ext.util.DelayedTask(function(){
            Ext.Viewport.setMasked(false);
          });
          task.delay(2000);
        }
      }
    },
    autoLoad: false
  }
});