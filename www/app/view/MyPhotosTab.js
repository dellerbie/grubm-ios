Ext.define('Grubm.view.MyPhotosTab', {
  extend: 'Ext.DataView',
  requires: ['Grubm.store.MyImages'],
  xtype: 'myphotostab',
  config: {
    ui: 'myphotos-tab-view',
    store: 'MyImages',
    itemTpl: '<div class="image"><img src="{url}" width="69" height="69" /></div>',
    emptyText: "You haven't uploaded any photos.",
    deferEmptyText: true
  }
});