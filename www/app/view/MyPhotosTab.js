Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.DataView',
  xtype: 'myphotostab',
  config: {
    ui: 'myphotos-tab-view',
    fullscreen: true,
    store: 'Images',
    itemTpl: '<div class="image"><img src="{url}" width="{width/3}" height="{height/3}" /></div>',
    emptyText: "You haven't uploaded any photos.",
    deferEmptyText: true
  }
});

