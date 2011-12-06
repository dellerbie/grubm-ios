Ext.Loader.setConfig({ enabled: true });

if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');
//FB.init({ appId: "268045516576285", nativeInterface: PG.FB });

Ext.application({
  name: 'Grubm',
  controllers: ['Main'],
  models: ['Image']
}); 