Ext.define('Grubm.view.BusinessInfo', {
	extend: 'Ext.Component',
  xtype: 'businessinfo',
  config: {
  	tpl: new Ext.XTemplate(
    	'<div class="business-wrapper">',
        '<h2>{name}</h2>',
        '<span class="street">{street}</span>',
        '<span class="city-state-zip">{city}, {state}<tpl if="zip != 0"> {zip}</tpl></span>',
      '</div>'
    )
  }
});