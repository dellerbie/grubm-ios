Ext.define('Grubm.view.BusinessInfo', {
	extend: 'Ext.Component',
  xtype: 'businessinfo',
  config: {
  	tpl: new Ext.XTemplate(
    	'<div class="business-wrapper">',
    	  '<p class="taken-at">Taken at</p>',
    	  '<span class="name">{name}</span>',
        '<span class="city-state">in {city}, {state}</span>',
        '<span class="phone">{phone}</span>',
      '</div>'
    )
  }
});