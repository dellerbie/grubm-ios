Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  requires: [
    'Grubm.view.Overlay'
  ],
  config: {
    baseUrl: "http://la.grubm.com",
    apiServer: "http://192.168.1.71:3000",
    //apiServer: "http://www.grubm.com",
    profile: Ext.os.deviceType.toLowerCase(),
    currentPosition: null,
    currentPlace: null,
    currentImage: null,
    user: null,
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
      imageDetail: 'imagedetail',
      deleteButton: '#deletePhoto',
      uploadedImage: 'uploadphoto #uploaded-image',
      uploadPhoto: 'uploadphoto',
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
        select: 'showImageDetailsFromFindFoodView'
      },
      'myphotostab': {
        select: 'showDetailsForMyPhotos'
      },
      '#refresh-myphotos': {
        tap: 'loadMyPhotos'
      },
      '#deletePhoto': {
        tap: 'deletePhoto'
      },
      'uploadphoto #select-pic': {
        tap: 'selectImage'
      },
      'uploadphoto': {
        show: 'onUploadPhotoShow',
        hide: 'resetUploadPhoto'
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
        keyup: 'filterPlaces',
        clearicontap: 'resetPlacesFilter'
      },
      'whereareyou dataview': {
        select: 'onLocationSelected'
      },
      'whereareyou #cancelSelectLocation': {
        tap: 'cancelSelectLocation'
      },
      'loginview': {
        fbtap: 'loginToFacebook'
      },
      'loginview': {
        fbtap: 'loginToFacebook'
      },
      'mainview': {
        activeitemchange: 'onMainTabChange'
      },
      'myphotosnavview': {
        push: 'onMyPhotosNavigationPush',
        pop: 'onMyPhotosNavigationPop'
      },
      'findfoodnavview': {
        push: 'onFindFoodNavigationPush',
        pop: 'onFindFoodNavigationPop'
      }
    }
  },

  launch: function() {
    Ext.Ajax.timeout = 30000;
    
    Ext.create('Grubm.view.Login').hide();
    Ext.create('Grubm.view.Main').hide();
    Ext.create('Grubm.view.MyPhotosTab');
    Ext.create('Grubm.view.UploadPhoto');
    var self = this;
    
    Ext.getStore('MyImages').on('beforeload', function() { self.maskViewport(); });
    Ext.getStore('Images').on('beforeload', function() { self.maskViewport(); });
    
    Ext.getStore('User').setData([{
      accessToken: "BAADzyTXMlh0BADI1HKyQ4cEGVmViAwLTMth3nuaRZCENFZBZCYsgEo2SDTzRFBD72HoB3bGEtehNeQ5OaKmZCqyqmjq2PjApKP2ezzVyhWDPFEJhBFlzqYZA8n9VoDaqCNuZBuEePtNQZDZD",
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
    
    // FB.getLoginStatus(function(response) {
    //   if(response.status == 'connected') {
    //     self.initUser(response.session);
    //   } else {
    //     self.getLogin().show();
    //     self.getMain().hide();
    //   }
    // });
    
    
    Ext.getStore('MyImages').on('load', Ext.bind(this.onMyImagesStoreLoad, this));
    Ext.getStore('Images').on('load', Ext.bind(this.onImagesStoreLoad, this));
  },

  onMainTabChange: function(mainTabPanel, newVal, oldVal) {
    var self = this;
    if(newVal.getId() == 'logout') {
      self.maskViewport();
      FB.logout(function(response) {
        self.logout();
        self.unmaskViewport();
      }, function() {
        self.logout();
        self.unmaskViewport();
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
      Ext.getStore('MyImages').load({
        params: {
          access_token: user.get('accessToken'), 
          oauth_provider: 'facebook'
        },
        callback: function() {
          console.log('callback');
        }
      });
    }
  },

  onMyImagesStoreLoad: function(store, records, successful) {
    if(records.length == 0) {
      this.getMyPhotosTab().element.addCls('empty');
    } else {
      this.getMyPhotosTab().element.removeCls('empty');
    }
    this.unmaskViewport();
  },

  onImagesStoreLoad: function(store, records) {
    if(records.length == 0) {
      this.getImages().element.addCls('empty');
    } else {
      this.getImages().element.removeCls('empty');
    }
    this.unmaskViewport();
  },

  onCitySelect: function(list, city) {
    this.setBaseUrl(city.get('url'));
    this.getFindFoodNavigationView().push({
      xtype: 'imagesview'
    });
    
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
    } else {
      this.hideSearchBar();
    }
  },
  
  onFindFoodNavigationPop: function(view, item) {    
    if(view.getActiveItem().xtype == "citypickerview") {
      this.hideSearchBar();
    } else {
      this.showSearchBar();
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
  
  showImageDetailsFromFindFoodView: function(list, image) {
    var view = this.getFindFoodNavigationView().push({
      xtype: 'imagedetail'
    });
    view.setImage(image);
    
    var business = image.get('business'),
        moreBusinessPhotosView = view.child('morebusinessphotos');
        
    var businessStore = Ext.getStore('Businesses');
    businessStore.getProxy().setUrl(this.getBaseUrl() + "/business/" + business.normalized_name + ".json");
    businessStore.load({params: {limit: 12}});
    
    view.add(Ext.create('Grubm.view.MoreBusinessPhotos'));
    this.getImages().deselectAll();
    this.positionBusinessMap(business);
    
    var imageDiv = Ext.select('#imageInfoPanel .image');
    imageDiv.setStyle({
      width: image.data.width + "px",
      height: image.data.height + "px",
      "-webkit-background-size": "100% 100%"
    });
  },

  showDetailsForMyPhotos: function(list, image) {
    var view = this.getMyPhotosNavigationView().push({
      xtype: 'imagedetail'
    });
    view.setImage(image);
    this.getMyPhotosTab().deselectAll();
    this.positionBusinessMap(image.get('business'));
    Ext.select('#imageInfoPanel .image').setStyle({
      width: "306px",
      height: "306px",
      "-webkit-background-size": "306px 306px"
    });
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
  
  takePhoto: function() {
    this.selectImage(true);
  },

  selectImage: function(takePhoto) {
    var options = {
      limit: 1,
      quality: 45,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 612,
      targetHeight: 612, 
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI
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
  
  maskViewport: function(msg, panel) {    
    if(!msg || Ext.String.trim(msg) == '') {
      msg = 'Loading...';
    }
    Grubm.view.Overlay.show(msg, Ext.Viewport);
  },
  
  unmaskViewport: function() {
    Grubm.view.Overlay.hide();
  },

  onGetImageSuccess: function(imageURI) {
    this.maskViewport();
    
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
      self.unmaskViewport();
    });
    task.delay(2000);
  },

  onGetImageError: function() {
    this.maskViewport("Error getting photo.");
    var self = this;
    var task = new Ext.util.DelayedTask(function(){
      self.unmaskViewport();
    });
    task.delay(2000);
  },

  onUploadPhotoShow: function(uploadPhoto) {
    if(!this.getChoosePhoto()) {
      Ext.Viewport.add(Ext.create('Grubm.view.ChoosePhoto'));
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
    var box = Ext.Msg.confirm("Delete Photo", "Are you sure you want to delete this photo?", 
      function(button) {
        if(button == 'no') {
          box.hide();
        } else {
          this.maskViewport("Deleting photo...");
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
              Ext.getStore('MyImages').load({
                params: {
                  access_token: user.get('accessToken'), 
                  oauth_provider: 'facebook'
                }
              });
              self.unmaskViewport();
            },
            failure: function() {
              Ext.Msg.alert("Delete Error", "There was a problem deleting your photo. Please try again later.", Ext.emptyFn);
              self.unmaskViewport();
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
      this.maskViewport("Uploading...");
      var options = new FileUploadOptions();
      options.fileKey = "image[photo]";
      options.fileName = img.substr(img.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";

      var user = Ext.getStore('User').first();

      options.params = {
        "access_token": user.get('accessToken'),
        "oauth_provider": "facebook",
        "image[description]": description,
        "image[business][name]": place.data.name,        
        "image[business][street]": place.data.street,
        "image[business][city]": place.data.city,
        "image[business][state]": place.data.state,
        "image[business][zip]": place.data.zip,
        "image[business][lat]": place.data.geometry.location.lat,
        "image[business][lng]": place.data.geometry.location.lng,
        "image[business][phone]": place.data.phone
      };

      var placeCategories = [];
      for(var i = 0; i < place.data.types.length; i++) {
        options.params["image[business][categories][]"] = place.data.types[i];
      }

      var self = this,
          ft = new FileTransfer();
          
      ft.upload(img, 
        this.getApiServer() + '/v1/images.json',
        function(r) {
          self.resetUploadPhoto();
          self.getMain().setActiveItem(0);
          self.loadMyPhotos();
          self.unmaskViewport();
          if(postToFB == 1) {
            var task = new Ext.util.DelayedTask(function(){
              self.postToFacebook(Ext.JSON.decode(r.response));
            });
            task.delay(5000);
          }
        },
        function(error) {
          self.unmaskViewport();
          Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: "Couldn't upload image. Try again later.",
            indicator: false
          });
          var task = new Ext.util.DelayedTask(function(){
            self.unmaskViewport();
          });
          task.delay(2000);
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

  cancelSelectLocation: function() {
    this.getUploadPhoto().setActiveItem(0, {type: 'slide', direction: 'right'});
  },

  onGetCurrentPositionSuccess: function(position) {
    this.setCurrentPosition(position.coords.latitude + ',' + position.coords.longitude);
    var self = this;
    Ext.Ajax.request({
      url: "https://maps.googleapis.com/maps/api/place/search/json?&radius=500&sensor=true&key=AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc",
      method: 'GET',
      params: {
        location: self.getCurrentPosition()
      },
      success: function(response) {
        var json = Ext.decode(response.responseText);
        Ext.getStore('Places').setData(json.results);
      }
    });
  },

  onGetCurrentPositionError: function(error) {
    this.getUploadPhoto().setActiveItem(0, {type: 'slide', direction: 'right'});
    Ext.Msg.alert("Location Error", "Error getting your current location. You need to enable location for Grubm in your phone settings", Ext.emptyFn);
  },
  
  resetPlacesFilter: function() {
    this.filterPlaces();
    return true;
  },

  filterPlaces: function(searchField) {
    var self = this,
        query = searchField ? searchField.getValue() : '';
        
    Ext.Ajax.request({
      url: "https://maps.googleapis.com/maps/api/place/search/json?&radius=500&sensor=true&key=AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc",
      method: 'GET',
      params: {
        name: query,
        location: this.getCurrentPosition()
      },
      success: function(response) {
        var json = Ext.decode(response.responseText);
        Ext.getStore('Places').setData(json.results, false);
      }
    });
  },

  onLocationSelected: function(dataview, place) {
    this.getUploadPhoto().setActiveItem(0);
    this.getLocationText().setHtml('&#64; ' + place.get('name'));
    var self = this;

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
        
        place.data['street'] = street_number + ' ' + street;
        place.data['city'] = city;
        place.data['state'] = state;
        place.data['zip'] = zip;
        place.data['phone'] = json.result.formatted_phone_number;
        self.setCurrentPlace(place);
      }
    });
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

  initUser: function(session) {
    var self = this;
    FB.api('/me', function(res) {
      if(res.error) {
        self.getLogin().show();
        self.getMain().hide();
        Ext.Msg.alert('Facebook Login Error', 'There was a problem connecting to your Facebook account', Ext.emptyFn);
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
        
        console.log('token => ');
        console.log(session.access_token);
        
        self.getLogin().hide();
        self.loadMyPhotos();
        self.getMain().show();
      }          
    });
  },

  postToFacebook: function(image) {
    var user = Ext.getStore('User').first();

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
        link: this.getApiServer() + '/' + image.id,
        "picture": image.url,  // it doesn't work if picture isn't quoted
        description: description,
        name: 'mmm food',
        caption: 'grubm.com'
      },
      success: Ext.emptyFn
    });
  }
});