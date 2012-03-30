Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  requires: [
    'Grubm.view.Overlay'
  ],
  config: {
    baseUrl: "http://la.grubm.com",
    apiServer: 'http://www.grubm.com',
    profile: Ext.os.deviceType.toLowerCase(),
    currentPosition: null,
    currentPlace: null,
    currentImage: null,
    user: null,
    production: true,
    staticMapBaseUrl: "http://maps.googleapis.com/maps/api/staticmap?",
    refs: {
      main: 'mainview',
      login: 'loginview',
      citypicker: 'citypickerview',
      food: 'foodview',
      findFoodNavigationView: 'findfoodnavview',
      searchBar: 'searchbar',
      images: 'imagesview',
      business: 'businessview',
      myPhotosNavigationView: 'myphotosnavview',
      myPhotosTab: 'myphotostab',
      imageDetail: 'myphotosnavview imagedetail',
      deleteButton: '#deletePhoto',
      uploadedImage: 'uploadphoto #uploaded-image',
      uploadPhoto: 'uploadphoto',
      savePhotoButton: '#save-photo',
      selectLocationButton: '#select-location',
      photoDescription: 'uploadphoto textareafield',
      postToFacebook: 'uploadphoto checkboxfield',
      choosePhoto: 'choosephoto',
      whereAreYou: 'whereareyou',
      locationText: 'uploadphoto #location-text',
      businessMap: 'imagedetail businessmap'
    },
    control: {
      'citypickerview': {
        select: 'onCitySelect'
      },
      'imagesview': {
        itemtap: 'showImageDetailsFromFindFoodView'
      },
      'myphotostab': {
        itemtap: 'showDetailsForMyPhotos'
      },
      '#deletePhoto': {
        tap: 'deletePhoto'
      },
      'uploadphoto #select-pic': {
        tap: 'selectImage'
      },
      'uploadphoto': {
        show: 'onUploadPhotoShow',
      },
      'uploadphoto #select-location': {
        tap: 'selectLocation'
      },
      'uploadphoto #cancel': {
        tap: 'cancelUploadPhoto'
      },
      'uploadphoto #save-photo': {
        tap: 'savePhoto'
      },
      'choosephoto button[ui="cancel"]': {
        tap: 'cancelUploadPhoto'
      },
      'choosephoto #take-photo': {
        tap: 'takePhoto'
      },
      'choosephoto #choose-photo': {
        tap: 'selectImage'
      },
      'whereareyou searchfield': {
        clearicontap: 'resetPlacesFilter'
      },
      'whereareyou dataview': {
        select: 'onLocationSelected',
        show: 'networkAvailable'
      },
      'whereareyou #cancelSelectLocation': {
        tap: 'cancelSelectLocation'
      },
      'loginview': {
        fbtap: 'loginToFacebook',
        show: 'networkAvailable'
      },
      'mainview': {
        activeitemchange: 'onMainTabChange'
      },
      'myphotosnavview': {
        push: 'onMyPhotosNavigationPush',
        pop: 'onMyPhotosNavigationPop',
        show: 'networkAvailable'
      },
      'findfoodnavview': {
        push: 'onFindFoodNavigationPush',
        pop: 'onFindFoodNavigationPop',
        show: 'networkAvailable'
      }
    }
  },

  launch: function() {
    var self = this;
    Ext.Ajax.timeout = 30000;
    
    Ext.create('Grubm.view.Login').hide();
    Ext.create('Grubm.view.Main');
    
    Ext.getStore('MyImages').getProxy().setUrl(this.getApiServer() + '/v1/images.json');
    Ext.getStore('MyImages').on('beforeload', function() { self.showLoadingOverlay(); });
    Ext.getStore('Images').on('beforeload', function() { self.showLoadingOverlay(); });

    if(this.getProduction()) {
      if(this.networkAvailable()) {
        FB.getLoginStatus(function(response) {
          if(response.status == 'connected') {
            self.initUser(response.session);
          } else {
            self.getLogin().show();
            self.getMain().hide();
          }
        });
      } else {
        self.getLogin().show();
      }
    } else {
      Ext.getStore('User').setData([{
        accessToken: "BAADzyTXMlh0BAINFJZAetOGDWtCPiD3I4AZAgVvDV4Hp1YmpfjID8LB5XnIM7XsB3cUH47bjRIgr3kIylKYhBMIZCFXhAz5YtUT885cqgTwsZC3WlTQRAyfa3ZBsyczw8ujrMxGdn8wZDZD",
        secret: "630bc3266929913d0010b4a1bc79cd2a",
        oauthType: 'facebook',
        uid: '',
        firstName: 'Derrick',
        lastName: 'Ellerbie',
        gender: 'Male',
        email: 'derrick@grubm.com'
      }]);
      self.getLogin().hide();
      self.loadMyPhotos();
      self.getMain().show();
    }
    
    Ext.getStore('MyImages').on('load', Ext.bind(this.onMyImagesStoreLoad, this));
    Ext.getStore('Images').on('load', Ext.bind(this.onImagesStoreLoad, this));
    this.getWhereAreYou().down('searchfield').on('keyup', Ext.Function.createBuffered(this.filterPlaces, 300, this));
  },
  
  initUser: function(session) {
    var self = this;
    if(this.networkAvailable()) {
      FB.api('/me', function(res) {
        if(res.error) {
          self.getLogin().show();
          self.getMain().hide();
          self.showOverlay("Facebook authentication error.");
        } else {
          Ext.getStore('User').setData([{
            accessToken: session.access_token,
            secret: session.secret,
            oauthType: 'facebook',
            uid: res.id,
            firstName: res.first_name,
            lastName: res.last_name,
            gender: res.gender,
            email: res.email
          }]);

          self.getLogin().hide();
          self.loadMyPhotos();
          self.getMain().show();
        }          
      });
    }
  },
  
  loginToFacebook: function() {
    var self = this;

    FB.login(function(response) {
      if(response.session) {
        self.getLogin().hide();
        self.initUser(response.session);
        self.getMain().show(); 
      } else {
        self.getLogin().show();
        Ext.Msg.alert('Facebook Login Error', 'Could not log in to Facebook.  Please try again.', Ext.emptyFn);
      }
    },{ 
      perms: "email,publish_stream,offline_access" 
    });
  },

  onMainTabChange: function(mainTabPanel, newVal, oldVal) {
    var self = this;
    if(newVal.getId() == 'logout') {
      self.showLoadingOverlay();
      FB.logout(function(response) {
        self.logout();
        self.hideLoadingOverlay();
      }, function() {
        self.logout();
        self.hideLoadingOverlay();
      });
    }
  },
  
  logout: function() {
    Ext.getStore('MyImages').setData({});
    this.getMain().setActiveItem(0);
    this.getMain().hide();
    this.getLogin().show();
  },

  loadMyPhotos: function() {
    var user = Ext.getStore('User').first(),
        self = this;
      
    if(user) {
      var store = Ext.getStore('MyImages');
      store.getProxy().setExtraParams({
        access_token: user.get('accessToken'),
        oauth_provider: 'facebook'
      })
      Ext.getStore('MyImages').load();
    }
  },
  
  onMyImagesError: function() {
    self.hideLoadingOverlay();
    this.showOverlay("Couldn't get images");
    var task = new Ext.util.DelayedTask(function() {
      this.hideOverlay();
    }, this);
    task.delay(2000);
  },

  onMyImagesStoreLoad: function(store, records, successful) {
    if(store.getCount() == 0) {
      this.getMyPhotosTab().element.addCls('empty');
    } else {
      this.getMyPhotosTab().element.removeCls('empty');
    }
    this.hideLoadingOverlay();
  },

  onImagesStoreLoad: function(store, records) {
    if(store.getCount() == 0) {
      this.getImages().element.addCls('empty');
    } else {
      this.getImages().element.removeCls('empty');
    }
    this.hideLoadingOverlay();
  },

  onCitySelect: function(list, city) {
    this.setBaseUrl(city.get('url'));
    this.getSearchBar().setValue('');
    
    if(!this.findFoodImagesView) {
      this.findFoodImagesView = Ext.create('Grubm.view.Images');
    }
    
    this.getFindFoodNavigationView().push(this.findFoodImagesView);
    list.deselectAll();
    Ext.getStore('Images').getProxy().setUrl(this.getBaseUrl() + '/.json');
    Ext.getStore('Images').load();
  },
  
  onMyPhotosNavigationPush: function(view, item) {
    var deleteButton = this.getDeleteButton();
    if (view.xtype == "myphotosnavview") {
      this.showDeleteButton();
    } else {
      this.hideDeleteButton();
    }
  },
  
  onMyPhotosNavigationPop: function(view, item) {
    this.hideDeleteButton();
    this.myPhotosImageDetail.getScrollable().getScroller().scrollTo(0, 0, false);
  },
  
  showDeleteButton: function() {
    var deleteButton = this.getDeleteButton();
    if (!deleteButton.isHidden()) {
      return;
    }
    deleteButton.show();
  },

  hideDeleteButton: function() {
    var deleteButton = this.getDeleteButton();
    if (deleteButton.isHidden()) {
      return;
    }
    deleteButton.hide();
  },
  
  onFindFoodNavigationPush: function(view, item) {
    if(item.xtype == "imagesview") {
      this.showSearchBar();
      view.element.down('.x-toolbar-grubm').addCls('no-logo');
    } else {
      view.element.down('.x-toolbar-grubm').removeCls('no-logo');
      this.hideSearchBar();
    }
  },
  
  onFindFoodNavigationPop: function(view, item) {  
    var activeItem = view.getActiveItem().xtype;
    if(activeItem == "citypickerview") {
      this.hideSearchBar();
      view.element.down('.x-toolbar-grubm').removeCls('no-logo');
    } else if(activeItem == "imagesview") {
      view.element.down('.x-toolbar-grubm').addCls('no-logo');
      this.showSearchBar();
    } else {
      this.showSearchBar();
    }
    
    if(this.findFoodImageDetail) {
      this.findFoodImageDetail.getScrollable().getScroller().scrollTo(0, 0, false);
    }
  },
  
  showSearchBar: function() {
    var searchBar = this.getSearchBar();
    if (!searchBar.isHidden()) {
      return;
    }
    searchBar.show();
  },
  
  hideSearchBar: function() {
    var searchBar = this.getSearchBar();
    if (searchBar.isHidden()) {
      return;
    }
    searchBar.hide();
  },
  
  showImageDetailsFromFindFoodView: function(list, index, target, image) {
    if(!this.findFoodImageDetail) {
      this.findFoodImageDetail = Ext.create('Grubm.view.ImageDetail');
    }
    
    this.getFindFoodNavigationView().push(this.findFoodImageDetail);
    this.findFoodImageDetail.setImage(image);
    
    var business = image.get('business'),
        moreBusinessPhotosView = this.findFoodImageDetail.child('morebusinessphotos');
        
    var businessStore = Ext.getStore('Businesses');
    businessStore.getProxy().setUrl(this.getBaseUrl() + "/business/" + business.normalized_name + ".json");
    businessStore.load({params: {limit: 12}});
    
    if(this.findFoodImageDetail.query('morebusinessphotos').length == 0) {
      this.findFoodImageDetail.add(Ext.create('Grubm.view.MoreBusinessPhotos'));
    }
    
    this.getImages().deselectAll();
    this.positionBusinessMap(business);
    
    var imageDiv = this.findFoodImageDetail.down('imageinfo').element.down('.image');
    imageDiv.setStyle({
      width: image.data.width + "px",
      height: image.data.height + "px",
      "-webkit-background-size": "100% 100%"
    });
  },

  showDetailsForMyPhotos: function(list, index, target, image) {
    if(!this.myPhotosImageDetail) {
      this.myPhotosImageDetail = Ext.create('Grubm.view.ImageDetail');
    }
    
    this.myPhotosImageDetail.setImage(image);
    this.getMyPhotosNavigationView().push(this.myPhotosImageDetail);
    this.getMyPhotosTab().deselectAll();
    this.positionBusinessMap(image.get('business'));
  },

  positionBusinessMap: function(business) {
    if(!business.street || Ext.String.trim(business.street) == '') return;
    
    var address = [business.street, business.city, business.state, business.zip].join(',');
    var map = Ext.get(this.getBusinessMap().element).select('.map');
    var params = Ext.Object.toQueryString({
      sensor: false,
      center: address,
      zoom: 15,
      size: "306x115",
      scale: 2,
      maptype: "roadmap",
      markers: "color:blue|" + address
    });
    map.setStyle({
      "background": "url(" + this.getStaticMapBaseUrl() + params +  ")",
      width: "306px",
      height: "110px",
      "-webkit-background-size": '100% 100%'
    });
  },

  onDetailHideAnimationStart: function() {
    this.getMyPhotosTab().deselectAll();
  },
  
  showOverlay: function(msg, loading) {
    if(!msg || Ext.String.trim(msg) == '') {
      msg = 'Loading...';
    }
    if(loading) {
      Grubm.view.Overlay.showLoading(msg, Ext.Viewport);
    } else {
      Grubm.view.Overlay.show(msg, Ext.Viewport);
    }
  },
  
  hideOverlay: function(loading) {
    if(loading) {
      Grubm.view.Overlay.hideLoading();
    } else {
      Grubm.view.Overlay.hide();
    }
  },
  
  showLoadingOverlay: function(msg) {    
    this.showOverlay(msg, true);
  },
  
  hideLoadingOverlay: function() {
    this.hideOverlay(true);
  },
  
  takePhoto: function() {
    this.selectImage(true);
  },

  selectImage: function(takePhoto) {
    var options = {
      limit: 1,
      quality: 49,
      encodingType: Camera.EncodingType.JPEG, 
      allowEdit: true,
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 612,
      targetHeight: 612
    };

    if(takePhoto == true) {
      navigator.device.capture.captureImage(
        Ext.bind(this.onGetImageSuccess, this), 
        this.onGetImageError, 
        options
      );
    } else {
      options['sourceType'] = Camera.PictureSourceType.PHOTOLIBRARY;
      navigator.camera.getPicture(
        Ext.bind(this.onGetImageSuccess, this), 
        this.onGetImageError,
        options
      );
    }
  },

  onGetImageSuccess: function(imageURI) {
    this.showLoadingOverlay();
    
    if(Ext.isArray(imageURI)) {
      imageURI = imageURI[0].fullPath;
    }
    var img = '<img src="' + imageURI + '" width="120" height="120" />';
    this.getUploadedImage().setHtml(img);
    this.setCurrentImage(imageURI);
    this.getChoosePhoto().hide();

    var self = this;
    var task = new Ext.util.DelayedTask(function(){
      self.selectLocation();
      self.hideLoadingOverlay();
    });
    task.delay(2000);
  },

  onGetImageError: function() {
    this.showLoadingOverlay("Error getting photo.");
    var self = this;
    var task = new Ext.util.DelayedTask(function(){
      self.hideLoadingOverlay();
    });
    task.delay(2000);
  },

  onUploadPhotoShow: function(uploadPhoto) {
    if(!this.getChoosePhoto()) {
      Ext.Viewport.add(Ext.create('Grubm.view.ChoosePhoto'));
    }
    
    if(!this.getCurrentImage()) {
      this.getChoosePhoto().show();
    }
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
    this.getSavePhotoButton().enable();
    this.getSelectLocationButton().enable();
    this.setCurrentPlace(null);
    this.setCurrentImage(null);
  },

  deletePhoto: function() {
    var view = this.getImageDetail();
    var box = Ext.Msg.confirm("Delete Photo", "Are you sure you want to delete this photo?", 
      function(button) {
        if(button == 'no') {
          box.hide();
        } else if(this.networkAvailable()) {
          this.showLoadingOverlay("Deleting photo...");
          this.getDeleteButton().disable();
          var image = view.getImage(),
              user = Ext.getStore('User').first(),
              self = this;
              
          box.hide();
          Ext.Ajax.request({
            url: this.getApiServer() + '/v1/images/' + image.get('id') + '.json',
            method: 'DELETE',
            params: {
              access_token: user.get('accessToken'),
              oauth_provider: 'facebook'
            },
            success: function() {
              self.getMyPhotosNavigationView().pop();
              self.getDeleteButton().enable();
              Ext.getStore('MyImages').load({
                params: {
                  access_token: user.get('accessToken'), 
                  oauth_provider: 'facebook'
                }
              });
              self.hideLoadingOverlay();
            },
            failure: function() {
              self.getDeleteButton().enable();
              self.hideLoadingOverlay();
              self.showOverlay("There was a problem deleting your photo. Please try again later.");
              var task = new Ext.util.DelayedTask(function(){
                self.hideOverlay();
              });
              task.delay(2500);
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
      errors.push("Description can't be blank");
    }

    if(place == null) {
      errors.push('Please check-in to a business by pressing the check-in button in the upper left');
    }

    if(errors.length == 0) {
      var options = new FileUploadOptions();
      options.fileKey = "image[photo]";
      options.fileName = img.substr(img.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";

      var user = Ext.getStore('User').first();
      
      options.params = {
        "access_token": user.get('accessToken'),
        "oauth_provider": "facebook",
        "image[description]": description,
        "image[business][name]": place.get('name'),        
        "image[business][street]": place.get('street'),
        "image[business][city]": place.get('city'),
        "image[business][state]": place.get('state'),
        "image[business][zip]": place.get('zip'),
        "image[business][lat]": place.get('geometry').lat,
        "image[business][lng]": place.get('geometry').lng,
        "image[business][phone]": place.get('phone')
      };

      var placeCategories = [];
      for(var i = 0; i < place.data.types.length; i++) {
        options.params["image[business][categories][]"] = place.data.types[i];
      }
      
      var self = this,
          ft = new FileTransfer();
          
      if(this.networkAvailable()) {
        this.showLoadingOverlay("Uploading...");
        this.getSavePhotoButton().disable();
        this.getSelectLocationButton().disable();
        ft.upload(img, 
          this.getApiServer() + '/v1/images.json',
          function(r) {
            self.resetUploadPhoto();
            self.getMain().setActiveItem(0);
            self.loadMyPhotos();
            self.hideLoadingOverlay();
            if(postToFB == 1) {
              var task = new Ext.util.DelayedTask(function(){
                self.postToFacebook(Ext.JSON.decode(r.response));
              });
              task.delay(5000);
            }
          },
          function(error) {
            self.getSavePhotoButton().enable();
            self.getSelectLocationButton().enable();
            self.hideLoadingOverlay();
            self.showOverlay("Couldn't upload photo. Try again later.");
          },
          options
        );
      }
    } else {
      Ext.Msg.alert("Upload Errors", errors.join(". "), Ext.emptyFn);
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

  cancelSelectLocation: function() {
    this.getWhereAreYou().down('searchfield').setValue('');
    this.getUploadPhoto().setActiveItem(0, {type: 'slide', direction: 'right'});
  },

  onGetCurrentPositionSuccess: function(position) {
    this.setCurrentPosition(position.coords.latitude + ',' + position.coords.longitude);
    var self = this;
    
    if(this.networkAvailable()) {
      Ext.Ajax.request({
        url: "https://maps.googleapis.com/maps/api/place/search/json?&radius=1600&sensor=true&key=AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc",
        method: 'GET',
        params: {
          location: self.getCurrentPosition()
        },
        success: function(response) {
          var json = Ext.decode(response.responseText);
          Ext.getStore('Places').setData(json.results);
        },
        failure: function() {
          self.showOverlay("Couldn't find any places near you.");
        }
      });
    } else {
      this.getUploadPhoto().setActiveItem(0, {type: 'slide', direction: 'right'});
    }
  },

  onGetCurrentPositionError: function(error) {
    this.getUploadPhoto().setActiveItem(0, {type: 'slide', direction: 'right'});
    this.showOverlay("Error getting your current location. You need to enable location for Grubm in your phone settings.");
  },
  
  resetPlacesFilter: function() {
    this.filterPlaces();
    return true;
  },

  filterPlaces: function(searchField) {        
    if(this.networkAvailable()) {
      var self = this,
          autocomplete = true,
          query = searchField ? searchField.getValue() : '',
          url = "https://maps.googleapis.com/maps/api/place/autocomplete/json",
          params = {
            location: this.getCurrentPosition(),
            radius: 1600,
            sensor: true,
            key: 'AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc'
          };
      
      if(Ext.String.trim(query) == '') {
        autocomplete = false;
        url = "https://maps.googleapis.com/maps/api/place/search/json";
      } else {
        params["input"] = query;
        params["types"] = 'establishment';
      }
      
      Ext.Ajax.request({
        url: url,
        method: 'GET',
        params: params,
        success: function(response) {
          var json = Ext.decode(response.responseText),
              results = autocomplete ? json.predictions : json.results;
          
          Ext.getStore('Places').setData(results, false);
        },
        failure: function() {
          self.showOverlay("Couldn't find any places near you.");
        }
      });
    }
  },

  onLocationSelected: function(dataview, place) {
    this.getUploadPhoto().setActiveItem(0);
    
    var name = place.get('name');
    if(!name && place.get('terms')) {
      name = place.get('terms')[0].value;
    }
    
    this.getLocationText().setHtml('&#64; ' + name);
    
    var self = this;

    if(this.networkAvailable()) {
      // get the places detailed info
      Ext.Ajax.request({
        url: "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc&sensor=true",
        method: 'GET',
        params: {
          reference: place.get('reference'),
        },
        success: function(response) {
          var json = Ext.decode(response.responseText);

          var street_number = street = city = zip = state = '';
          var address = json.result.address_components;

          for(var i = 0; i < address.length; i++) {
            if(Ext.Array.contains(address[i].types, 'street_number')) {
              street_number = address[i].long_name;
            } else if(Ext.Array.contains(address[i].types, 'route')) {
              street = address[i].long_name;
            } else if(Ext.Array.contains(address[i].types, 'locality')) {
              city = address[i].long_name;
            } else if(Ext.Array.contains(address[i].types, 'administrative_area_level_1')) {
              state = address[i].long_name;
            } else if(Ext.Array.contains(address[i].types, 'postal_code')) {
              zip = address[i].long_name;
            }
          }
          
          place.set('name', json.result.name);
          place.set('street', street_number + ' ' + street);
          place.set('city', city);
          place.set('state', state);
          place.set('zip', zip);
          place.set('phone', json.result.formatted_phone_number);
          place.set('geometry', {lat: json.result.geometry.location.lat, lng: json.result.geometry.location.lng});
          self.setCurrentPlace(place);
        },
        failure: function() {
          self.showOverlay("Couldn't get location.");
        }
      });
    }
  },

  postToFacebook: function(image) {
    var user = Ext.getStore('User').first();

    var description = '';
    if(image.business && image.business.name) {
      description += user.get('firstName') + " just had something mighty good at " + image.business.name;
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
        link: this.getApiServer() + '/' + image.id,
        "picture": image.url,  // it doesn't work if picture isn't quoted
        description: description,
        name: 'yum yum',
        caption: 'grubm.com'
      },
      success: Ext.emptyFn
    });
  },
  
  networkAvailable: function() {
    if(navigator && navigator.network && navigator.network.connection) {
      var networkState = navigator.network.connection.type;
      if(networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
        Grubm.view.Overlay.show("Network error. Grubm requires an internet connection.");
        return false;
      }
    }
    return true;
  }
});