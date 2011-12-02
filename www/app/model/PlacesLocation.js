Ext.define('Grubm.model.PlacesLocation', {
	extend: 'Ext.data.Model',
  fields: [
  	'address', 'postalCode', 'city', 'state',
    {name: 'lat', type: 'float'},
    {name: 'lng', type: 'float'},
    {name: 'distance', type: 'int'}
});