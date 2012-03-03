Ext.define('Grubm.view.MyPhotosNavigationView', {
  extend: 'Ext.navigation.View',
  xtype: 'myphotosnavview',
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
    iconCls: 'photos2',
    items:[{
      xtype: 'myphotostab'
    }]
  }
});