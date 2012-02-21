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
    var login = Ext.create('Grubm.view.Login'),
        main = Ext.create('Grubm.view.Main'),
        myphotos = Ext.create('Grubm.view.MyPhotosTab'),
        uploadPhoto = Ext.create('Grubm.view.UploadPhoto');
  }
}); 
