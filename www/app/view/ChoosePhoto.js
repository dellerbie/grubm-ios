Ext.define('Grubm.view.ChoosePhoto', {
	extend: 'Ext.ActionSheet',
  xtype: 'choosephoto',
  config: {
  	items: [{
    	text: 'Take a Photo',
      ui: 'action',
      id: 'take-photo'
    },{
    	text: 'Choose from Gallery',
      ui: 'action',
      id: 'choose-photo'
    },{
    	text: 'Cancel',
      ui: 'cancel'
    }]
  }
});