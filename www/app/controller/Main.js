Ext.define('Grubm.controller.Main', {
  extend: 'Ext.app.Controller',
  views: [
    'Main',
    'Food',
    'Business'
  ],
  stores: ['Cities', 'Images', 'Businesses'],
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
    ref: 'searchfield',
    selector: 'searchbar searchfield'
  }],
  
  config: {
    baseUrl: "http://la.grubm.com"
  },
  
  init: function() {
    console.log('inside main controller');
    this.getMainView().create();
    this.control({
      'citypickerview': {
        select: this.onCitySelect
      },
      'foodview button[ui="back"]': {
        tap: this.onBackToCityPicker
      },
      'imagesview': {
        select: this.onImageSelect
      },
      'businessview button': {
        tap: this.onBackToFoodView
      },
      'searchbar searchfield': {
        action: this.onSearch,
        searchclear: this.onSearchClear
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
  }
});