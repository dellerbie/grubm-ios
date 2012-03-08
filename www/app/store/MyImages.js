Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    pageSize: 30,
    proxy: {
      type: 'ajax',
      url: 'http://www.grubm.com/v1/images.json',
      listeners: {
        exception: function(proxy, response, operation) {
          if(!operation.success) {
            Grubm.view.Overlay.show("Couldn't get images.", Ext.Viewport);
            var task = new Ext.util.DelayedTask(function(){
              Grubm.view.Overlay.hide();
            });
            task.delay(2500);
          }
        }
      }
    },
    autoLoad: false
  }
});