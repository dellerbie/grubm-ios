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
    defaults: {
    	styleHtmlContent: true
    },
    items: [
    {
      id: 'maincontainer',
      xtype: 'container',
      layout: 'card',
      animation: {
        type: 'slide',
        direction: 'left'
      },
      title: 'Find Food',
      iconCls: 'home',
      items:[{
        xtype: 'citypickerview',
        flex: 1
      },{
        xtype: 'foodview',
        flex: 1
      },{
        xtype: 'businessview',
        flex: 1
      }]
    },{
    	xtype: 'myphotostab',
      title: 'My Photos',
      iconCls: 'user'
    }]
  }
});