Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    proxy: {
      type: 'jsonp',
      //url: 'http://192.168.1.76:3000/v1/images.json',
      url: "http://www.grubm.com/v1/images.json",
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