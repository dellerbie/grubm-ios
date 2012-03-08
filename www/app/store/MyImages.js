Ext.define('Grubm.store.MyImages', {
  extend  : 'Ext.data.Store',
  requires: ['Grubm.model.MyImage'],
  config: {
    model: 'Grubm.model.MyImage',
    pageSize: 30,
    proxy: {
      type: 'jsonp',
      reader: {
        type: 'json',
        rootProperty: 'images'
      },
      listeners: {
        exception: function() {
          Grubm.view.Overlay.show("Couldn't get images.", Ext.Viewport);
        }
      }
    },
    autoLoad: false,
    listeners: {
      beforeload: function() {
        if(navigator && navigator.network && navigator.network.connection) {
          var networkState = navigator.network.connection.type;
          if(networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
            Grubm.view.Overlay.show("Network error. Grubm requires an internet connection.");
            return false;
          }
        }
      }
    }
  }
});