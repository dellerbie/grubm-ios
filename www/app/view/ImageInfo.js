Ext.define('Grubm.view.ImageInfo', {
	extend: 'Ext.Component',
  xtype: 'imageinfo',
  config: {
  	tpl: new Ext.XTemplate(
      '<img src={url} width="{width}" height="{height}" />',
      '<span class="what">{description}</span>'
    )
  }
});