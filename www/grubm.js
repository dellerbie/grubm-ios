Ext.Loader.setConfig({ enabled: true });

Ext.application({
  name: 'Grubm',
  controllers: ['MyPhotos'],
  models: ['Image']
});