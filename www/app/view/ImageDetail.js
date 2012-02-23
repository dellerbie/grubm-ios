Ext.define('Grubm.view.ImageDetail', {
  extend: 'Ext.Sheet',
  xtype: 'imagedetail',
  requires: [
  	'Grubm.view.ImageInfo', 
    'Grubm.view.BusinessInfo',
    'Grubm.view.MoreBusinessPhotos',
    'Grubm.view.BusinessMap'
  ],

  config: {
    modal: true,
    centered : false,
    hideOnMaskTap : true,

    ui: 'image-detail',
    width: 400,
    top: 0,
    bottom: 0,
    right: 0,

    image: null,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
      xtype: 'carousel',
      flex: 1,
      items: [{
      	xtype: 'panel',
        autoScroll: true,
        items: [{ 
          xtype: 'imageinfo'
        },{
        	xtype: 'spacer',
          height: 15
        },{
          xtype: 'button',
          ui: 'decline',
          text: 'Delete'
        }]
      },{
      	xtype: 'panel',
        items: [{
        	xtype: 'businessinfo'
        },{
        	xtype: 'businessmap',
        }]
      }]
    }]
  },

  animationDuration: 300,

  initialize: function() {
    this.on({
      scope: this,
      hiddenchange: this.onHiddenChange
    });
  },

  onHiddenChange: function(me, hidden) {
    if (!hidden) {
      var carousel = this.down('carousel');
      carousel.setActiveItem(0);
    }
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