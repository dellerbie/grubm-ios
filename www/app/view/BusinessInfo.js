Ext.define('Grubm.view.BusinessInfo', {
	extend: 'Ext.Component',
  xtype: 'businessinfo',
  config: {
  	tpl: new Ext.XTemplate(
    	'<div class="business-wrapper">',
    	  '<p class="taken-at">Taken at <span class="name">{name}</span></p>',
        '<tpl if="city && state"><span class="city-state">in {city}, {state}</span></tpl>',
        '<span class="phone">{phone}</span>',
      '</div>'
    )
  }
});