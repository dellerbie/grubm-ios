Ext.define('Grubm.store.Cities', {
    extend  : 'Ext.data.Store',
    model   : 'Grubm.model.City',
    requires: ['Grubm.model.City'],
    data: [
     {name: 'Los Angeles', url: 'http://la.grubm.com'},
     {name: 'New York City', url: 'http://nyc.grubm.com'},
     {name: 'Philadelphia', url: 'http://philly.grubm.com'},
     {name: 'San Francisco', url: 'http://sf.grubm.com'}
    ]
});