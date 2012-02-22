Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  config: {
    baseUrl: "http://la.grubm.com",
    apiServer: "http://192.168.1.76:3000",
    // apiServer: "http://grubm.com",
    profile: Ext.os.deviceType.toLowerCase(),
    currentPosition: null,
    currentPlace: null,
    currentImage: null,
    user: null,
    refs: {
      main: 'mainview',
      login: 'loginview'
      // citypicker: 'citypickerview',
      // food: 'foodview',
      // images: 'imagesview',
      // business: 'businessview',
      // myPhotosTab: 'myphotostab',
      // imageDetail: 'imagedetail',
      // deleteImageBtn: 'imagedetail button',
      // uploadedImage: 'uploadphoto #uploaded-image',
      // uploadPhoto: 'uploadphoto',
      // photoDescription: 'uploadphoto textareafield',
      // postToFacebook: 'uploadphoto checkboxfield',
      // choosePhoto: 'choosephoto',
      // whereAreYou: 'whereareyou',
      // locationText: 'uploadphoto #location-text',
      // businessMap: 'imagedetail map'
    },
    control: {
    //   'citypickerview': {
    //     select: 'onCitySelect'
    //   },
    //   'foodview button[ui="back"]': {
    //     tap: 'onBackToCityPicker'
    //   },
    //   'imagesview': {
    //     select: 'showDetailsSheet'
    //   },
    //   'searchbar searchfield': {
    //     action: 'onSearch',
    //     searchclear: 'onSearchClear'
    //   },
      'myphotostab': {
        select: 'showDetailsSheet',
        activate: 'loadMyPhotos'
      },
    //   'imagedetail': {
    //     hideanimationstart: 'onDetailHideAnimationStart'
    //   },
    //   'imagedetail button[ui="decline"]': {
    //     tap: 'deletePhoto'
    //   },
    //   'uploadphoto #select-pic': {
    //     tap: 'selectImage'
    //   },
    //   'uploadphoto': {
    //     show: 'onUploadPhotoShow',
    //     hide: 'resetUploadPhoto'
    //   },
    //   'uploadphoto #select-location': {
    //     tap: 'selectLocation'
    //   },
    //   'uploadphoto #cancel': {
    //     tap: 'cancelUploadPhoto'
    //   },
    //   'uploadphoto #save-photo': {
    //     tap: 'savePhoto'
    //   },
    //   'choosephoto button[ui="cancel"]': {
    //     tap: 'cancelUploadPhoto'
    //   },
    //   'choosephoto #take-photo': {
    //     tap: 'selectImage'
    //   },
    //   'choosephoto #choose-photo': {
    //     tap: Ext.bind(this.selectImage, this, [true])
    //   },
    //   'whereareyou searchfield': {
    //     keyup: 'filterPlaces'
    //   },
    //   'whereareyou dataview': {
    //     select: 'onLocationSelected'
    //   },
    //   'whereareyou #cancelSelectLocation': {
    //     tap: 'cancelSelectLocation'
    //   },
    //   'loginview': {
    //     fbtap: 'loginToFacebook'
    //   },
      'loginview': {
        fbtap: 'loginToFacebook'
      },
      'mainview': {
        activeitemchange: 'onMainTabChange'
      }
    }
  },

  launch: function() {
    console.log('controller launch');

    var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
    mask.show();
    var self = this;
    FB.getLoginStatus(function(response) {
      console.log('fb response => ');
      console.log(JSON.stringify(response));
      if(response.status == 'connected') {
        console.log('logged in...response.session => ');
        console.log(JSON.stringify(response.session));
        self.initUser(response.session);
        self.getLogin().hide();
        self.getMain().show();
        mask.hide();
      } else {
        console.log('not logged in');
        self.getLogin().show();
        self.getMain().hide();
        mask.hide();
      }
    });
    Ext.getStore('MyImages').on('load', Ext.bind(this.onMyImagesStoreLoad, this));
    Ext.getStore('Images').on('load', Ext.bind(this.onImagesStoreLoad, this));
  },

  onMainTabChange: function(mainTabPanel, newVal, oldVal) {
    var self = this;
    if(newVal.title == 'Logout') {
      var mask = new Ext.LoadMask(Ext.getBody(), {msg:""});
      mask.show();
      FB.logout(function(response) {
        self.getMyImagesStore().loadData({});
        self.getMain().setActiveItem(0);
        self.getMain().hide();
        self.getLogin().show();
        mask.hide();
      });
    }
  },

  loadMyPhotos: function() {
    var user = Ext.getStore('User').first(),
    self = this,
    mask = new Ext.LoadMask(Ext.getBody(), {msg:""});

    mask.show();
    Ext.getStore('MyImages').load({
      params: {
        access_token: user.get('accessToken'), 
        oauth_provider: 'facebook'
      },
      callback: function() {
        mask.hide();
      }
    });
  },

  onMyImagesStoreLoad: function(store, records, successful) {
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

    var business = image.get('business'),
    mbp = view.child('carousel').child('morebusinessphotos'),
    isFindFoodView = list.isXType('imagesview');

    if(isFindFoodView) {
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

    view.show();
    this.positionBusinessMap(business);

    var imageDiv = Ext.get(Ext.DomQuery.selectNode('.x-sheet-image-detail .image')),
    width = image.data.width,
    height = image.data.height;

    if(isFindFoodView) {
      imageDiv.setStyle({
        width: width + "px",
        height: height + "px",
        "-webkit-background-size": "100% 100%"
      });
    } else {
      var halfW = Math.floor(width/2) + "px", 
      halfH = Math.floor(height/2) + "px";

      imageDiv.setStyle({
        width: halfW,
        height: halfH,
        "-webkit-background-size": halfW + ' ' + halfH
      });
    }
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
    var options = {
      limit: 1,
      quality: 45,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 600,
      targetHeight: 600, 
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI
    };

    if(fromLibrary == true) {
      options['sourceType'] = Camera.PictureSourceType.PHOTOLIBRARY;
      navigator.camera.getPicture(
        Ext.bind(this.onGetImageSuccess, this), 
        this.onGetImageError,
        options
      );
    } else {
      navigator.device.capture.captureImage(
        Ext.bind(this.onGetImageSuccess, this), 
        this.onGetImageError, 
        options
      );
    }
  },

  onGetImageSuccess: function(imageURI) {
    if(Ext.isArray(imageURI)) {
      imageURI = imageURI[0].fullPath;
    }
    var img = '<img src="' + imageURI + '" width="120" height="120" />';
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
    var box = Ext.Msg.confirm("Delete Photo", "Are you sure you want to delete this photo?", 
      function(button) {
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
        "image[business][street]": place.data.street,
        "image[business][city]": place.data.city,
        "image[business][state]": place.data.state,
        "image[business][zip]": place.data.zip,
        "image[business][lat]": place.data.geometry.lat,
        "image[business][lng]": place.data.geometry.lng,
        "image[business][phone]": place.data.phone
      };

      var placeCategories = [];
      for(var i = 0; i < place.data.types.length; i++) {
        options.params["image[business][categories][]"] = place.data.types[i];
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
        self.getPlacesStore().loadData(json.results, false);
      }
    });
  },

  onGetCurrentPositionError: function(error) {
    Ext.Msg.alert("Location Error", "Error getting your current location. You need to enable location for Grubm in your phone settings app", Ext.emptyFn);
  },

  filterPlaces: function(searchField) {
    var self = this;
    Ext.Ajax.request({
      url: "https://maps.googleapis.com/maps/api/place/search/json?&radius=500&sensor=true&key=AIzaSyC1r6ur7cJpsAZ8kldZ3wlvr2f7kfh_Xsc",
      method: 'GET',
      params: {
        name: searchField.getValue(),
        location: this.getCurrentPosition()
      },
      success: function(response) {
        var json = Ext.decode(response.responseText);
        self.getPlacesStore().loadData(json.results, false);
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
    console.log('login to facebook');
    var self = this;
    console.log(FB.login);

    FB.login(function(response) {
      console.log('login');
      console.log(JSON.stringify(response));
      if(response.session) {
        console.log('success');
        self.getLogin().hide();
        self.initUser(response.session);
        self.getMain().show(); 
      } else {
        console.log('fail');
        self.getLogin().show();
        Ext.Msg.alert('Facebook Login Error', 'Could not log in to Facebook.  Please try again.', Ext.emptyFn);
      }
    },{ 
      perms: "email,publish_stream,offline_access" 
    });
  },

  initUser: function(session) {
    var user = Ext.create('Grubm.model.User', {
      accessToken: session.access_token,
      secret: session.secret,
      oauthType: 'facebook'
    });
    
    console.log('access_token => ' + user.get('accessToken'));

    var self = this;
    FB.api('/me', function(res) {
      if(res.error) {
        self.getLogin().show();
        Ext.Msg.alert('Facebook Login Error', 'There was a problem connecting to your Facebook account', Ext.emptyFn);
      } else {
        user.set('uid', res.id);
        user.set('firstName', res.first_name);
        user.set('lastName', res.last_name);
        user.set('gender', res.gender);
        user.set('email', res.email);
        Ext.getStore('User').loadData(user, false);
        Ext.getStore('MyImages').load({
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