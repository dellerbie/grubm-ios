Ext.define('Grubm.view.UploadPhoto', {
	extend: 'Ext.form.Panel',
  requires: ['Grubm.store.Places'],
  xtype: 'uploadphoto',
  config: {
  	items: [{
    	xtype: 'container',
			layout: 'vbox',
      height: 200,
      border: 1,
      items: [{
      	docked: 'top',
        xtype: 'toolbar',
        items: [{
          xtype: 'textfield', 
          placeHolder: 'Where are you..',
          useClearIcon: true,
          name: 'q'
        }]
			},{
      	xtype: 'list',
        store: 'Places',
        itemTpl: '{name}',
        flex: 1
      }]
    },{
    	xtype: 'fieldset',
      title: 'Image Description',
      style: 'margin-bottom: .5em; margin-top: 0;',
      items: [{
      	xtype: 'textareafield',
        name: 'description',
        maxLength: 140,
        maxRows: 10,
        required: true
      }]
    },{
    	xtype: 'image',
      id: 'uploaded-image',
      src: '',
      height: 240,
      width: 240
    },{
    	xtype: 'spacer',
      height: 10
    },{
    	xtype: 'button',
      ui: 'action',
      text: 'Take a Picture'
    },{
    	xtype: 'spacer',
      height: 10
    },{
    	xtype: 'button',
      id: 'select-pic',
      ui: 'action',
      text: 'Select an Existing Picture'
    },{
    	xtype: 'spacer',
      height: 10
    },{
    	xtype: 'button',
      ui: 'confirm',
      text: 'Upload'
    }]
  }
});