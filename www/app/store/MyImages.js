Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    pageSize: 30,
    proxy: {
      type: 'jsonp',
      url: 'http://www.grubm.com/v1/images.json',
      reader: {
        type: 'json',
        rootProperty: 'images'
      },
      listeners: {
        exception: function(proxy, response, operation) {
          if(!operation.success) {
            console.log(operation);
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