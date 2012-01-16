Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  requires: ['Grubm.model.User'],
  views: [
    'Main',
    'Login',
    'Food',
    'Business',
    'MyPhotosTab',
    'ImageDetail',
    'UploadPhoto',
    'ChoosePhoto'
  ],
  stores: ['Cities', 'Images', 'MyImages', 'Businesses', 'Places', 'User'],
  refs: [{
    ref: 'main',
    selector: 'mainview'
  },{
    ref: 'login',
    selector: 'loginview'
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
  	ref: 'postToFacebook',
    selector: 'uploadphoto checkboxfield'
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
//    apiServer: "http://192.168.1.76:3000",
    apiServer: "http://grubm.com",
    profile: Ext.os.deviceType.toLowerCase(),
    currentPosition: null,
    currentPlace: null,
    currentImage: null,
    user: null
  },
  
  init: function() {
  	this.getLoginView().create();
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
      	tap: this.deletePhoto
      },
      'uploadphoto #select-pic': {
      	tap: this.selectImage
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
      'uploadphoto #save-photo': {
      	tap: this.savePhoto
      },
      'choosephoto button[ui="cancel"]': {
      	tap: this.cancelUploadPhoto
      },
      'choosephoto #take-photo': {
      	tap: this.selectImage
      },
      'choosephoto #choose-photo': {
      	tap: Ext.bind(this.selectImage, this, [true])
      },
      'whereareyou searchfield': {
      	keyup: this.filterPlaces
      },
      'whereareyou dataview': {
      	select: this.onLocationSelected
      },
      'loginview': {
      	fbtap: this.loginToFacebook
      }
    });

		var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
    mask.show();
    
		var self = this;
    FB.getLoginStatus(function(response) {
    	if(response.session) {
        self.initUser(response.session);
        self.getLogin().hide();
        self.getMain().show();
        mask.hide();
      } else {
        self.getLogin().show();
        self.getMain().hide();
       	mask.hide();
      }
    });
    
    this.getMyImagesStore().on('load', Ext.bind(this.onMyImagesStoreLoad, this));
    this.getImagesStore().on('load', Ext.bind(this.onImagesStoreLoad, this));
  },
  
  onMyImagesStoreLoad: function(store, records) {
  	if(records.length == 0) {
      this.getMyPhotosTab().el.addCls('empty');
    } else {
			this.getMyPhotosTab().el.removeCls('empty');
    }
  },
  
  onImagesStoreLoad: function(store, records) {
  	if(records.length == 0) {
      this.getImages().el.addCls('empty');
    } else {
			this.getImages().el.removeCls('empty');
    }
  },
  
  onCitySelect: function(list, city) {
    this.setBaseUrl(city.get('url'));
    this.getImages().getStore().proxy.url = this.getBaseUrl() + '/.json';
    this.getImages().getStore().load();
    this.getMain().child('#maincontainer').setActiveItem(this.getFood(), {type: 'slide', direction: 'left'});
  },
  
  onBackToCityPicker: function() {
    this.getMain().child('#maincontainer').setActiveItem(this.getCitypicker(), {type: 'slide', direction: 'right'});
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
    
    var view = this.getImageDetail();
    view.setImage(image);
    
    if (this.getProfile() == "phone") {
      view.setWidth(null);
      view.setHeight('85%');
      view.setTop(null);
      view.setLeft(0);
    }
    
    var business = image.get('business');
    var mbp = view.child('carousel').child('morebusinessphotos');
    
    if(list.isXType('imagesview')) {
      this.getBusinessesStore().proxy.url = this.getBaseUrl() + "/business/" + business.normalized_name+ ".json";
 	    this.getBusinessesStore().load({params: {limit: 12}});
    	if(!mbp) {
    		view.child('carousel').add({xtype: 'morebusinessphotos'});
      }
    	this.getDeleteImageBtn().hide();
      this.getImages().deselectAll();
    } else {
    	if(mbp) {
      	view.child('carousel').remove(mbp);
      }
    	this.getDeleteImageBtn().show();
    	this.getMyPhotosTab().deselectAll();
    }
    
    this.positionBusinessMap(business);
    view.show();
  },    
  
  positionBusinessMap: function(business) {
    var address = [business.street, business.city, business.state].join(',');
    
    if(business.lat && business.lng) {
    	var map = this.getBusinessMap().getMap();
      var latLng = new google.maps.LatLng(business.lat, business.lng);
      map.setCenter(latLng);
      map.setZoom(16);
      var marker = new google.maps.Marker({
        map: map,
        position: latLng
      });
    } else {
    	this.getBusinessMap().geocoder.geocode( { 'address': address}, Ext.bind(this.onGeocodeSuccess, this));
    }
  },
  
  onGeocodeSuccess: function(results, status) {
  	if(status == google.maps.GeocoderStatus.OK) {
      var map = this.getBusinessMap().getMap();
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    }
  },
  
  onDetailHideAnimationStart: function() {
    this.getMyPhotosTab().deselectAll();
  },
  
  selectImage: function(fromLibrary) {
    navigator.camera.getPicture(Ext.bind(this.onGetImageSuccess, this), this.onGetImageError, { 
    	quality: 45,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 240,
      targetHeight: 240, 
      sourceType: (fromLibrary == true) ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI
    });
  },
  
  onGetImageSuccess: function(imageURI) {
  	var img = '<img src="' + imageURI + '" width="100" height="100" />';
  	this.getUploadedImage().setHtml(img);
    this.setCurrentImage(imageURI);
    this.getChoosePhoto().hide();
    
    // show mask for 2 seconds, then show selectLocation
    var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
    mask.show();
    var self = this;
    var task = new Ext.util.DelayedTask(function(){
			self.selectLocation();
      mask.hide();	
    });
    task.delay(2000);
  },
  
  onGetImageError: function() {
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
    this.getPostToFacebook().setValue(1);
    this.getPostToFacebook().setChecked(true);
    this.setCurrentPlace(null);
    this.setCurrentImage(null);
  },
  
  deletePhoto: function() {
  	var view = this.getImageDetail();
    view.hide();
  	var box = Ext.Msg.confirm("Delete Photo", "Are you sure you want to delete this photo?", function(button) {
    	if(button == 'no') {
      	box.hide();
        view.show();
      } else {
        var image = view.getImage(),
        		user = this.getUserStore().first(),
            self = this;
            
        box.hide();
        
        var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
        mask.show();
        
        Ext.Ajax.request({
          url: this.getApiServer() + '/v1/images/' + image.get('id') + '.json',
          method: 'DELETE',
          params: {
            access_token: user.get('accessToken'),
            oauth_provider: 'facebook'
          },
          success: function() {
            self.getMyImagesStore().load({
              params: {
                access_token: user.get('accessToken'), 
                oauth_provider: 'facebook'
              }
            });
            mask.hide();
          },
          failure: function() {
            Ext.Msg.alert("Delete Error", "There was a problem deleting your photo. Please try again later.", Ext.emptyFn);
          }
        });
      }  
    }, this);
  },
  
  savePhoto: function() {
		var img = this.getCurrentImage();
  	var description = this.getPhotoDescription().getValue();
    var postToFB = this.getPostToFacebook().getValue();
    var place = this.getCurrentPlace();
    var errors = [];
    
    if(img == null) {
    	errors.push('Please select an image');
    }
    
    if(Ext.String.trim(description) == '') {
    	errors.push('Description cannot be blank');
    }
    
    if(place == null) {
    	errors.push('Please check-in to a business by pressing the check-in button in the upper left');
    }
    
    if(errors.length == 0) {
      // save it
      
      var options = new FileUploadOptions();
      options.fileKey = "image[photo]";
      options.fileName = img.substr(img.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      
      var user = this.getUserStore().first();
      
      options.params = {
      	"access_token": user.get('accessToken'),
        "oauth_provider": "facebook",
      	"image[description]": description,
        "image[business][name]": place.data.name,        
        "image[business][street]": place.data.location.address,
        "image[business][city]": place.data.location.city,
        "image[business][state]": place.data.location.state,
        "image[business][zip]": place.data.location.postalCode,
        "image[business][lat]": place.data.location.lat,
        "image[business][lng]": place.data.location.lng
      };
      
    	var placeCategories = [];
      for(var i = 0; i < place.data.categories.length; i++) {
      	options.params["image[business][categories][]"] = place.data.categories[i].name;
      }
      
      var ft = new FileTransfer();
      var self = this;
      
			var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
      mask.show();
      
      ft.upload(img, 
      	this.getApiServer() + '/v1/images.json',
        function(r) {
          self.resetUploadPhoto();
    			self.getMain().setActiveItem(0);
          self.getMyImagesStore().load({
            params: {
              access_token: user.get('accessToken'), 
              oauth_provider: 'facebook'
            }
          });
          mask.hide();
          if(postToFB == 1) {
          	self.postToFacebook(Ext.JSON.decode(r.response));
          }
        },
        function(error) {
        	mask.hide();
          Ext.Msg.alert("Upload Error", "An error has occurred: Code = " + error.code, Ext.emptyFn);
        },
        options
      );
    } else {
    	Ext.Msg.alert("Upload Errors", errors.join("\n"), Ext.emptyFn);
    }
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
    Ext.Msg.alert("Location Error", "Error getting your current location. You need to enable location for Grubm in your phone settings app", Ext.emptyFn);
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
    this.setCurrentPlace(place);//
  },
  
  loginToFacebook: function() {
  	var self = this;
    self.getLogin().hide();
    var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
    mask.show();

  	FB.login(function(response) {
    	if(response.session) {
        self.initUser(response.session);
        self.getMain().show(); 
        mask.hide();
      } else {
       	Ext.Msg.alert('Facebook Login Error', 'Could not log in to Facebook.  Please try again.', Ext.emptyFn);
        self.getLogin().show();
        mask.hide();
      }
    }, { 
    	perms: "email,publish_stream,offline_access" 
    });
  },
  
	initUser: function(session) {
  	var user = Ext.create('Grubm.model.User', {
      accessToken: session.access_token,
      secret: session.secret,
      oauthType: 'facebook'
    });
    
    console.log('access_token => ');
    console.log(user.get('accessToken'));
    
    var self = this;
    FB.api('/me', function(res) {
      if(res.error) {
        Ext.Msg.alert('Facebook Login Error', 'There was a problem connecting to your Facebook account', Ext.emptyFn);
      } else {
        user.set('uid', res.id);
        user.set('firstName', res.first_name);
        user.set('lastName', res.last_name);
        user.set('gender', res.gender);
        user.set('email', res.email);
        self.getUserStore().loadData(user, false);
        self.getMyImagesStore().load({
          params: {
            access_token: user.get('accessToken'), 
            oauth_provider: 'facebook'
          }
        });
      }          
    });
  },
  
  postToFacebook: function(image) {
  	var user = this.getUserStore().first();
    
    var description = '';
    if(image.business && image.business.name) {
    	description += user.get('firstName') + " just had something delicious at " + image.business.name;
      if(image.business.city && image.business.state) {
      	description += " in " + image.business.city + ", " + image.business.state;
      }
    }
    
  	Ext.Ajax.request({
    	url: "https://graph.facebook.com/me/feed",
      method: 'POST',
      params: {
      	access_token: user.get('accessToken'),
        message: image.description,
				link: 'http://www.google.com',
  			"picture": image.url,  // it doesn't work if picture isn't quoted
  			description: description,
        name: 'mmm food',
        caption: 'grubm.com'
      },
      success: Ext.emptyFn
    });
  }
});