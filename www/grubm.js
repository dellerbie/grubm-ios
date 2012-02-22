Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath({
  'Grubm': 'app'
});

Ext.application({
  name: 'Grubm',
  controllers: ['Main'],
  views: [
   'Main',
   'Login',
   'Food',
   'Business',
   'MyPhotosTab',
   'ImageDetail',
   'UploadPhoto',
   'ChoosePhoto'
  ],
  stores: [
   'Cities', 
   'Images', 
   'MyImages', 
   'Businesses', 
   'Places', 
   'User'
  ],
  launch: function() {
	  console.log('app launch');
    Ext.create('Grubm.view.Login');
    Ext.create('Grubm.view.Main');
    //Ext.create('Grubm.view.MyPhotosTab');
    // Ext.create('Grubm.view.UploadPhoto');
  }
}); 
