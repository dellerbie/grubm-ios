Ext.define('Grubm.view.BusinessMap', {
  extend: 'Ext.Panel',
  xtype: 'businessmap',
  config: {
    html: '<div class="map"></div>'
  }
});

// Ext.define('Grubm.view.BusinessMap', {
//   extend: 'Ext.Map',
//   xtype: 'businessmap',
//   config: {
//     height: 200,
//     mapOptions: {
//       mapTypeId: google.maps.MapTypeId.ROADMAP,
//       navigationControl: false,
//       disableDefaultUI: true,
//       draggable: false
//     }
//   }
// });