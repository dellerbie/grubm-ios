Ext.define('Grubm.view.UploadPhoto', {
	extend: 'Ext.Container',
  requires: ['Grubm.store.Places', 'Grubm.view.WhereAreYou'],
  xtype: 'uploadphoto',
  config: {
  	layout: 'card',
  	items: [{
    	xtype: 'panel',
			layout: 'vbox',
      items: [{
      	xtype: 'toolbar',
        docked: 'top',
        items: [{
        	id: 'select-location',
        	iconCls: 'locate',
          iconMask: true,
          ui: 'action-round'
        },{
        	xtype: 'spacer'
        },{
        	text: 'Cancel',
          id: 'cancel'
        },{
        	text: 'Save',
          id: 'save-photo',
          ui: 'confirm'
        }]
      },{
        xtype: 'panel',
        id: 'uploaded-image'
      },{
        xtype: 'spacer',
        height: 10
      },{
      	xtype: 'panel',
        items: [{
        	xtype: 'fieldset',
          items: [{
            xtype: 'textareafield',
            name: 'description',
            placeHolder: 'Enter a description...',
            maxLength: 140
          }]
        },{
        	xtype: 'panel',
        	id: 'location-text',
          style: 'color: #15c; font-size: .85em; text-align: center;'
        }]
      }]
    },{
    	xtype: 'whereareyou'
    }]
  }
});