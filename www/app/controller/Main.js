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
  	ref: 'photoDescription',
    selector: 'uploadphoto textareafield'
  },{
  	ref: 'choosePhoto',
    selector: 'choosephoto'
  },{
  	ref: 'whereAreYou',
    selector: 'whereareyou'
  },{
  	ref: 'locationText',
    selector: 'uploadphoto #location-text'
  },{
  	ref: 'businessMap',
    selector: 'imagedetail map'
  }],
  
  config: {
    baseUrl: "http://la.grubm.com",
    profile: Ext.os.deviceType.toLowerCase(),
    currentPosition: null
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
      'imagedetail button[ui="decline"]': {
      	tap: function() { alert('delete image'); }
      },
      'uploadphoto #select-pic': {
      	tap: this.selectExistingImage
      },
      'uploadphoto': {
      	show: this.onUploadPhotoShow,
        hide: this.resetUploadPhoto
      },
      'uploadphoto #select-location': {
      	tap: this.selectLocation
      },
      'uploadphoto #cancel': {
      	tap: this.cancelUploadPhoto
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
      'whereareyou searchfield': {
      	keyup: this.filterPlaces
      },
      'whereareyou dataview': {
      	select: this.onLocationSelected
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
    
    var business = image.get('business');
    this.getBusinessesStore().proxy.url = this.getBaseUrl() + "/business/" + business.normalized_name+ ".json";
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
    	this.getDeleteImageBtn().show();
    	this.getMyPhotosTab().deselectAll();
    }
    
    this.positionBusinessMap(business);
    
    view.show();
  },    
  
  positionBusinessMap: function(business) {
    var address = [business.street, business.city, business.state].join(',');
    this.getBusinessMap().geocoder.geocode( { 'address': address}, Ext.bind(this.onGeocodeSuccess, this));
  },
  
  onGeocodeSuccess: function(results, status) {
  	if (status == google.maps.GeocoderStatus.OK) {
      var map = this.getBusinessMap().getMap();
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      this.getBusinessMap().hide();
    }
  },
  
  onDetailHideAnimationStart: function() {
    this.getMyPhotosTab().deselectAll();
  },
  
  selectExistingImage: function() {
    navigator.camera.getPicture(Ext.bind(this.onGetImageSuccess, this), this.onGetImageError, { 
    	quality: 45,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 240,
      targetHeight: 240, 
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI
    });
  },
  
  onGetImageSuccess: function(imageURI) {
  	var img = '<img src="' + imageURI + '" width="100" height="100" />';
  	this.getUploadedImage().setHtml(img);
    this.getChoosePhoto().hide();
  },
  
  onGetImageError: function() {
  	alert('There was an error getting the image.  Please try again');
  },
  
  onUploadPhotoShow: function(uploadPhoto) {
  	if(!this.getChoosePhoto()) {
    	Ext.Viewport.add(this.getChoosePhotoView().create());
    }
    this.getChoosePhoto().show();
  },
  
  cancelUploadPhoto: function() {
    this.getChoosePhoto().hide();
    this.resetUploadPhoto();
    this.getMain().setActiveItem(0);
  },
  
  resetUploadPhoto: function() {
  	this.getUploadedImage().setHtml('');
    this.getLocationText().setHtml('');
    this.getPhotoDescription().setValue('');
  },
  
  selectLocation: function() {
  	navigator.geolocation.getCurrentPosition(
    	Ext.bind(this.onGetCurrentPositionSuccess, this), 
    	Ext.bind(this.onGetCurrentPositionError, this),
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
  	this.getUploadPhoto().setActiveItem(this.getWhereAreYou(), {type: 'slide', direction: 'left'});
  },
  
  onGetCurrentPositionSuccess: function(position) {
  	this.setCurrentPosition(position.coords.latitude + ',' + position.coords.longitude);
    this.getPlacesStore().load({params: {ll: this.getCurrentPosition()}});
  },
  
  onGetCurrentPositionError: function(error) {
  	alert("Error getting your current position.\ncode: " + error.code + "\nmessage: " + error.message);
  },
  
  filterPlaces: function(searchField) {
    this.getPlacesStore().load({
    	params: {
      	limit: 50, 
        query: searchField.getValue(),
        ll: this.getCurrentPosition()
      }
    });
  },
  
  onLocationSelected: function(dataview, place) {
    this.getUploadPhoto().setActiveItem(0);
    this.getLocationText().setHtml('&#64; ' + place.get('name'));
  }
});