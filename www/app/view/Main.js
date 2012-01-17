Ext.define('Grubm.view.Main', {
  extend: 'Ext.TabPanel',
  xtype: 'mainview',
  requires: [
    'Grubm.view.CityPicker',
    'Grubm.view.MyPhotosTab'
  ],
  config: {
    fullscreen: true,
    tabBarPosition: 'bottom',
    items: [{
    	title: 'My Photos',
      iconCls: 'photos2',
    	xtype: 'myphotostab'
    },{
    	title: 'Upload',
      iconCls: 'photo1',
      xtype: 'uploadphoto'
    },{
      id: 'maincontainer',
      xtype: 'container',
      layout: 'card',
      animation: {
        type: 'slide',
        direction: 'left'
      },
      title: 'Find Food',
      iconCls: 'search',
      items:[{
        xtype: 'citypickerview',
        flex: 1
      },{
        xtype: 'foodview',
        flex: 1
      }]
    },{
    	id: 'logout',
    	title: 'Logout',
      iconCls: 'logout',
      html: ''
    }]
  }
});