Ext.define('Grubm.view.ImageInfo', {
	extend: 'Ext.Component',
  xtype: 'imageinfo',
  config: {
  	tpl: new Ext.XTemplate(
      '<div class="image" style="background: url({url}) no-repeat;"></div>',
      '<span class="what">{description}</span>'
    )
  }
});