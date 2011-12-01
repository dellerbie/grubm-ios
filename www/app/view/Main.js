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
    	title: 'My Photos',
      iconCls: 'user',
    	xtype: 'myphotostab'
    },{
    	title: 'Upload',
      iconCls: 'upload',
      xtype: 'uploadphoto'
    }]
  }
});