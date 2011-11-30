Ext.define('Grubm.controller.MyPhotos', {
    extend: 'Ext.app.Controller',
    
    config: {
        profile: Ext.os.deviceType.toLowerCase()
    },
    
    views: ['MyPhotosTab', 'ImageDetail'],
    stores: ['MyImages'],
    
    refs: [{
    	ref: 'myPhotos',
      selector: 'myphotostab'
    },{
    	ref: 'imageDetail',
      selector: 'imagedetail'
    }],

    init: function() {
			this.getMyPhotosTabView().create();

      this.control({
      	'myphotostab': {
        	select: this.showDetailsSheet
        },
        'imagedetail': {
          hideanimationstart: this.onDetailHideAnimationStart
        }
      });
    },
    
    showDetailsSheet: function(list, image) {
      if (!this.getImageDetail()) {
        this.getImageDetailView().create();
      }
      
      var view = this.getImageDetail();
      view.setImage(image);
      
      if (this.getProfile() == "phone") {
        view.setWidth(null);
        view.setHeight('80%');
        view.setTop(null);
        view.setLeft(0);
      }
      view.show();
    },    
    
    onDetailHideAnimationStart: function() {
      this.getMyPhotosTab().deselectAll();
    }
});