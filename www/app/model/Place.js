Ext.define('Grubm.model.Place', {
	extend: 'Ext.data.Model',
  fields: [
  	'name',
    'categories',
    'location'
  ],
  hasMany: [{model: 'Grubm.model.PlacesCategory', name: 'categories'}],
  hasOne: [{model: 'Grubm.model.PlacesLocation', name: 'location'}]
});