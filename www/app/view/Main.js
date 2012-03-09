Ext.define('Grubm.view.Main', {
  extend: 'Ext.TabPanel',
  xtype: 'mainview',
  requires: [
    'Grubm.view.CityPicker',
    'Grubm.view.UploadPhoto',
    'Grubm.view.FindFoodNavigationView',
    'Grubm.view.MyPhotosNavigationView'
  ],
  config: {
    fullscreen: true,
    tabBarPosition: 'bottom',
    items: [{
      xtype: 'myphotosnavview',
      title: 'My Photos',
      iconCls: 'photos2'
    },{
      title: 'Upload',
      iconCls: 'photo1',
      xtype: 'uploadphoto'
    },{
      xtype: 'findfoodnavview',
      title: 'Find Food',
      iconCls: 'search'
    },{
      id: 'logout',
      title: 'Logout',
      iconCls: 'logout',
      html: ''
    }]
  }
});