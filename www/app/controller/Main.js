Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  views: [
    'Main',
    'Food',
    'Business',
    'MyPhotosTab',
    'ImageDetail',
    'MoreBusinessPhotos'
  ],
  stores: ['Cities', 'Images', 'Businesses', 'MyImages'],
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
  }],
  
  config: {
    baseUrl: "http://la.grubm.com",
    profile: Ext.os.deviceType.toLowerCase()
  },
  
  init: function() {
    this.getMainView().create();
    this.getMyPhotosTabView().create();
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
        select: this.showDetailsSheet
      },
      'imagedetail': {
        hideanimationstart: this.onDetailHideAnimationStart
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