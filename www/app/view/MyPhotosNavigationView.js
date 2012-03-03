Ext.define('Grubm.view.MyPhotosNavigationView', {
  extend: 'Ext.navigation.View',
  xtype: 'myphotosnavview',
  requires: [
    'Grubm.view.MyPhotosTab'
  ],
  config: {
    navigationBar: {
      items: [{
        xtype: 'button',
        id: 'deletePhoto',
        text: 'Delete',
        ui: 'decline',
        align: 'right',
        hidden: true
      }]
    },
    items:[{
      xtype: 'myphotostab'
    }]
  }
});