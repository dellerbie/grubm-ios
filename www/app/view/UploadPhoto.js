Ext.define('Grubm.view.UploadPhoto', {
	extend: 'Ext.Container',
  requires: ['Grubm.store.Places', 'Grubm.view.WhereAreYou'],
  xtype: 'uploadphoto',
  config: {
  	layout: 'card',
  	items: [{
    	xtype: 'panel',
      flex: 1,
      items: [{
        xtype: 'image',
        id: 'uploaded-image',
        src: '',
        height: 240,
        width: 240
      },{
        xtype: 'spacer',
        height: 10
      },{
        xtype: 'fieldset',
        style: 'margin-bottom: .5em; margin-top: 0;',
        items: [{
          xtype: 'textareafield',
          name: 'description',
          placeHolder: 'Enter a description...',
          maxLength: 140,
          required: true
        }]
      },{
        xtype: 'button',
        id: 'select-location',
        text: 'Select Your Location'
      },{
        xtype: 'spacer',
        height: 10
      }]
    },{
    	xtype: 'whereareyou',
      flex: 1
    }]
  }
});