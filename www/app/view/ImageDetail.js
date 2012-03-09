Ext.define('Grubm.view.ImageDetail', {
  extend: 'Ext.Panel',
  xtype: 'imagedetail',
  requires: [
  	'Grubm.view.ImageInfo', 
    'Grubm.view.BusinessInfo',
    'Grubm.view.MoreBusinessPhotos',
    'Grubm.view.BusinessMap'
  ],

  config: {
    ui: 'image-detail',
    scrollable: {
      direction: 'vertical',
      directionLock: true
    },
    image: null,
    items: [{
      xtype: 'imageinfo'
    },{
    	xtype: 'businessinfo'
    },{
    	xtype: 'businessmap'
    }]
  },

  updateImage: function(newImage) {
  	this.image = newImage;
    var imageView = this.down('imageinfo'),
        business = this.down('businessinfo');
    
    imageView.setData(newImage.data);
    business.setData(newImage.data.business);
  },
  
  getImage: function() {
  	return this.image;
  }
});