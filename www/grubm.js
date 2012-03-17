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
   'FindFoodNavigationView',
   'MyPhotosNavigationView',
   'MyPhotosTab',
   'ImageDetail',
   'UploadPhoto',
   'ChoosePhoto',
   'BusinessMap'
  ],
  models: [
    'User'
  ],
  stores: [
   'Cities', 
   'Images', 
   'MyImages', 
   'Businesses', 
   'Places', 
   'User'
  ]
});
