Ext.define('Grubm.model.Place', {
	extend: 'Ext.data.Model',
	config: {
	  fields: ['name', 'geometry', 'types', 'reference', 'street', 'city', 'state', 'phone']
	}
});