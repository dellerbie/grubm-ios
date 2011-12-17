Ext.define('Grubm.view.ImageDetail', {
  extend: 'Ext.Sheet',
  xtype: 'imagedetail',
  requires: [
  	'Grubm.view.ImageInfo', 
    'Grubm.view.BusinessInfo',
    'Grubm.view.MoreBusinessPhotos'
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
        	xtype: 'map',
          height: 200,
          mapOptions: {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            navigationControl: false
          },
          geocoder: new google.maps.Geocoder()
        }]
      }]
    }]
  },

  animationDuration: 300,

//  show: function(animation) {
//    this.callParent();
//
//    Ext.Animator.run([{
//      element  : this.element,
//      xclass   : 'Ext.fx.animation.SlideIn',
//      direction: Ext.os.deviceType == "Phone" ? "up" : "left",
//      duration : this.animationDuration
//    }, {
//      element : 'ext-mask-1',
//      xclass  : 'Ext.fx.animation.FadeIn',
//      duration: this.animationDuration
//    }]);
//  },

//  hide: function(animation) {
//    var me = this,
//        mask = Ext.getCmp('ext-mask-1');
//
//    //we fire this event so the controller can deselect all items immediately.
//    this.fireEvent('hideanimationstart', this);
//
//    //show the mask element so we can animation it out (it is already shown at this point)
//    mask.show();
//
//    Ext.Animator.run([{
//      element  : me.element,
//      xclass   : 'Ext.fx.animation.SlideOut',
//      duration : this.animationDuration,
//      preserveEndState: false,
//      direction: Ext.os.deviceType == "Phone" ? "down" : "right",
//      onEnd: function() {
//        me.setHidden(true);
//        mask.setHidden(true);
//      }
//    }, {
//      element : 'ext-mask-1',
//      xclass  : 'Ext.fx.animation.FadeOut',
//      duration: this.animationDuration
//    }]);
//  },

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