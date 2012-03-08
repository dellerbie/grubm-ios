Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    pageSize: 30,
    proxy: {
      type: 'ajax',
      listeners: {
        exception: function(proxy, response, operation, opts) {
          if(!operation.success) {
            var msg = "Couldn't get images.";
            if(response.status == 401) {
              msg = "Authentication error. Log out and log back in.";
            }
            Grubm.view.Overlay.show(msg, Ext.Viewport);
          }
        }
      }
    },
    autoLoad: false,
    listeners: {
      beforeload: function() {
        if(navigator && navigator.network && navigator.network.connection) {
          var networkState = navigator.network.connection.type;
          if(networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
            Grubm.view.Overlay.show("Network error. You aren't connected to the internet.");
            return false;
          }
        }
      }
    }
  }
});