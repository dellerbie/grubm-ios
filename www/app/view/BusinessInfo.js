Ext.define('Grubm.view.BusinessInfo', {
	extend: 'Ext.Component',
  xtype: 'businessinfo',
  config: {
  	tpl: new Ext.XTemplate(
    	'<div class="business-wrapper">',
        '<span class="place">{name}</span>',
        '<span class="street">{street}</span>',
        '<span class="city-state-zip">{city}, {state}<tpl if="zip != 0">{zip}</tpl></span>',
        '<tpl if="street && zip != 0">',
          '<a class="map" href="{map}" target="_blank">map</a>',
        '</tpl>',
      '</div>'
    )
  }
});