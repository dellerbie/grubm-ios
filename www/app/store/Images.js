Ext.define('Grubm.store.Images', {
  extend: 'Ext.data.Store',
  requires: ['Grubm.model.Image'],
  config: {
    model: 'Grubm.model.Image',
    pageSize: 30,
    proxy: {
      type: 'jsonp',
      url: 'http://la.grubm.com/.json',
      listeners: {
        exception: function(proxy, response, operation) {
          Grubm.view.Overlay.show("Couldn't get images.", Ext.Viewport);
          var task = new Ext.util.DelayedTask(function(){
            Grubm.view.Overlay.hide();
          });
          task.delay(2000);
        }
      }
    },
    autoLoad: false
  }
});