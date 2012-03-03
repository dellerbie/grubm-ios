Ext.define('Grubm.view.Business', {
  extend: 'Ext.dataview.DataView',
  xtype: 'businessview',
  requires: 'Grubm.store.Businesses',
  config: {
    ui: 'business',
    store: 'Businesses',
    itemTpl: new Ext.XTemplate(
      '<tpl for="business">',
        '<div class="business-wrapper">',
          '<span class="place">{name}</span>',
          '<span class="street">{street}</span>',
          '<span class="city-state-zip">{city}, {state}<tpl if="zip != 0">{zip}</tpl></span>',
          '<tpl if="street && zip != 0">',
          	'<a class="map" href="{map}" target="_blank">map</a>',
          '</tpl>',
        '</div>',
        '<h3 class="more">More Photos from {name}</h3>',
      '</tpl>',
      '<tpl for="images">',
        '<img src="{url}" width="{width}" height="{height}" />',
        '<span class="what">{description}</span>',
      '</tpl>'
    ),
    items: [{
      docked: 'top',
      xtype: 'toolbar',
      items: [{
        ui: 'back',
        text: 'Back'
      }]
    }]
  }
});