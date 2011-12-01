Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  views: [
    'Main',
    'Food',
    'Business',
    'MyPhotosTab',
    'ImageDetail',
    'MoreBusinessPhotos',
    'UploadPhoto',
    'ChoosePhoto'
  ],
  stores: ['Cities', 'Images', 'Businesses', 'MyImages', 'Places'],
  refs: [{
    ref     : 'main',
    selector: 'mainview'
  },{
    ref: 'citypicker',
    selector: 'citypickerview'
  },{
    ref: 'food',
    selector: 'foodview'
  },{
    ref: 'images',
    selector: 'imagesview'
  },{
    ref: 'business',
    selector: 'businessview'
  },{
  	ref: 'myPhotosTab',
    selector: 'myphotostab'
  },{
    ref: 'imageDetail',
    selector: 'imagedetail'
  },{
  	ref: 'moreBusinessPhotos',
    selector: 'morebusinessphotos'
  },{
  	ref: 'deleteImageBtn',
    selector: 'imagedetail button'
  },{
  	ref: 'uploadedImage',
    selector: 'uploadphoto #uploaded-image'
  },{
  	ref: 'uploadPhoto',
    selector: 'uploadphoto'
  },{
  	ref: 'choosePhoto',
    selector: 'choosephoto'
  },{
  	ref: 'whereAreYou',
    selector: 'whereareyou'
  }],
  
  config: {
    baseUrl: "http://la.grubm.com",
    profile: Ext.os.deviceType.toLowerCase()
  },
  
  init: function() {
    this.getMainView().create();
    this.getMyPhotosTabView().create();
    this.getUploadPhotoView().create();
    this.control({
      'citypickerview': {
        select: this.onCitySelect
      },
      'foodview button[ui="back"]': {
        tap: this.onBackToCityPicker
      },
      'imagesview': {
        select: this.showDetailsSheet
      },
      'businessview button': {
        tap: this.onBackToFoodView
      },
      'searchbar searchfield': {
        action: this.onSearch,
        searchclear: this.onSearchClear
      },
      'myphotostab': {
        select: this.showDetailsSheet,
      },
      'imagedetail': {
        hideanimationstart: this.onDetailHideAnimationStart
      },
      'uploadphoto #select-pic': {
      	tap: this.selectExistingImage
      },
      'uploadphoto': {
      	show: this.onUploadPhotoShow
      },
      'choosephoto button[ui="cancel"]': {
      	tap: this.cancelUploadPhoto
      },
      'choosephoto #take-photo': {
      	tap: function() { alert('tap'); }
      },
      'choosephoto #choose-photo': {
      	tap: this.selectExistingImage
      },
      'uploadphoto #select-location': {
      	tap: this.selectLocation
      }
    });
  },
  
  onCitySelect: function(list, city) {
    this.setBaseUrl(city.get('url'));
    this.getImages().getStore().proxy.url = this.getBaseUrl() + '/.json';
    this.getImages().getStore().load();
    this.getMain().getAt(0).setActiveItem(this.getFood(), {type: 'slide', direction: 'left'});
  },
  
  onBackToCityPicker: function() {
    this.getMain().getAt(0).setActiveItem(this.getCitypicker(), {type: 'slide', direction: 'right'});
  },
  
  onImageSelect: function(view, image) {
    var business = image.get('business').normalized_name;
    
    this.getBusiness().getStore().proxy.url = this.getBaseUrl() + "/business/" + business + ".json";
    this.getBusiness().getStore().load({params: {limit: 10}});
    this.getMain().getAt(0).setActiveItem(this.getBusiness(), {type: 'slide', direction: 'left'});
  },
  
  onBackToFoodView: function() {
    this.getMain().getAt(0).setActiveItem(this.getFood(), {type: 'slide', direction: 'right'});
  },
  
  onSearch: function(searchField) {
    this.getImages().getStore().load({
      params: {
        q: searchField.getValue()
      }
    });
  },
  
  onSearchClear: function(searchField, newVal, oldVal) {
    this.getImages().getStore().load();
  },
  
  showDetailsSheet: function(list, image) {
    if (!this.getImageDetail()) {
      Ext.Viewport.add(this.getImageDetailView().create());
    }
    
    var business = image.get('business').normalized_name;
    this.getBusinessesStore().proxy.url = this.getBaseUrl() + "/business/" + business + ".json";
    this.getBusinessesStore().load({params: {limit: 12}});
    
    var view = this.getImageDetail();
    view.setImage(image);
    
    if (this.getProfile() == "phone") {
      view.setWidth(null);
      view.setHeight('75%');
      view.setTop(null);
      view.setLeft(0);
    }
    
    if(list.isXType('imagesview')) {
    	this.getDeleteImageBtn().hide();
      this.getImages().deselectAll();
    } else {
    	this.getMyPhotosTab().deselectAll();
    }
    
    view.show();
  },    
  
  onDetailHideAnimationStart: function() {
    this.getMyPhotosTab().deselectAll();
  },
  
  selectExistingImage: function() {
    navigator.camera.getPicture(Ext.bind(this.onGetImageSuccess, this), this.onGetImageError, { 
    	quality: 70,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 240,
      targetHeight: 240, 
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    });
  },
  
  onGetImageSuccess: function(imageURI) {
  	this.getUploadedImage().setSrc(imageURI);
    this.getChoosePhoto().hide();
  },
  
  onGetImageError: function() {
  	console.log('get image error');
  },
  
  onUploadPhotoShow: function(uploadPhoto) {
  	if(!this.getChoosePhoto()) {
    	Ext.Viewport.add(this.getChoosePhotoView().create());
    }
    this.getChoosePhoto().show();
  },
  
  cancelUploadPhoto: function() {
    this.getChoosePhoto().hide();
    this.getMain().setActiveItem(0);
  },
  
  selectLocation: function() {
  	this.getUploadPhoto().setActiveItem(this.getWhereAreYou(), {type: 'slide', direction: 'left'});
  }
});