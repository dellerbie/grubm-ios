Ext.define('Grubm.view.BusinessInfo', {
	extend: 'Ext.Component',
  xtype: 'businessinfo',
  config: {
  	tpl: new Ext.XTemplate(
    	'<div class="business-wrapper">',
    	  '<p>',
    	    '<span class="taken-at">Taken at </span>',
    	    '<span class="name">{name}</span>',
    	    '<tpl if="city && state"><span class="city-state"> in {city}, {state}</span></tpl>',
    	  '</p>',
        '<span class="phone">{phone}</span>',
      '</div>'
    )
  }
});