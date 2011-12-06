Ext.define('Grubm.store.Places', {
  extend: 'Ext.data.Store',
	fields: ['name', 'categories', 'location'],
  autoLoad : true,
  proxy: {
  	type: 'jsonp',
    reader: {
    	type: 'json',
    	root: 'response.venues'
    },
    
    url: "https://api.foursquare.com/v2/venues/search?client_id=ZMKLRTL0V4P1IFW5SGEZZW4UDLXA5E5SQPQ0UYBOFYSEF3AR&client_secret=FBITQXCVAZMB23XM0COS5ZNTZZDSZU2XXCQ5LDUFBJ35QXDB&v=20111201&limit=50&intent=browse&radius=1620"
  }
/*	data: {
    "meta": {
        "code": 200
    },
    "response": {
        "venues": [
            {
                "id": "4eaf053bf5b99d2425f5bfa1",
                "name": "Teaspiller",
                "contact": {},
                "location": {
                    "address": "200 Water St Suite 3107",
                    "lat": 40.7009866,
                    "lng": -74.0000831,
                    "distance": 110,
                    "postalCode": "10038",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d125941735",
                        "name": "Tech Startup",
                        "pluralName": "Tech Startups",
                        "shortName": "Tech Startup",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/building/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 14,
                    "usersCount": 8,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "42377700f964a52024201fe3",
                "name": "Brooklyn Heights Promenade",
                "contact": {},
                "location": {
                    "address": "Columbia Heights",
                    "crossStreet": "btwn Montague & Middagh",
                    "lat": 40.69829137715981,
                    "lng": -73.99663209915161,
                    "distance": 342,
                    "postalCode": "11201",
                    "city": "Brooklyn",
                    "state": "NY",
                    "country": "USA"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d163941735",
                        "name": "Park",
                        "pluralName": "Parks",
                        "shortName": "Park",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 6942,
                    "usersCount": 3256,
                    "tipCount": 49
                },
                "hereNow": {
                    "count": 1
                }
            },
            {
                "id": "4ec2db036c25adc5b2dbca7f",
                "name": "CLS Bank",
                "contact": {},
                "location": {
                    "address": "32 old slip",
                    "crossStreet": "Water street",
                    "lat": 40.7012938,
                    "lng": -74.0003162,
                    "distance": 146,
                    "postalCode": "10005",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 15,
                    "usersCount": 1,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4d1d130616cfb60c53103c61",
                "name": "S.i.r.t.Tottenville Express Train",
                "contact": {},
                "location": {
                    "address": "st gorge",
                    "lat": 40.69998376666667,
                    "lng": -74.001405,
                    "distance": 118,
                    "city": "staten island",
                    "state": "ny"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1fc931735",
                        "name": "Light Rail",
                        "pluralName": "Light Rails",
                        "shortName": "Light Rail",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/travel/lightrail_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 54,
                    "usersCount": 9,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 1
                }
            },
            {
                "id": "4b81ea40f964a520e0c330e3",
                "name": "Brooklyn Bridge Park - Pier 1",
                "contact": {},
                "location": {
                    "address": "334 Furman Street",
                    "lat": 40.701984159668676,
                    "lng": -73.9969539642334,
                    "distance": 338,
                    "postalCode": "11201",
                    "city": "Brooklyn",
                    "state": "NY",
                    "country": "USA"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d163941735",
                        "name": "Park",
                        "pluralName": "Parks",
                        "shortName": "Park",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 7238,
                    "usersCount": 4671,
                    "tipCount": 40
                },
                "hereNow": {
                    "count": 1
                }
            },
            {
                "id": "4e4ce3ddbd413c4cc66cfdbd",
                "name": "Subway",
                "contact": {
                    "phone": "2125714417",
                    "formattedPhone": "(212) 571-4417"
                },
                "location": {
                    "address": "199 Maiden Ln",
                    "lat": 40.7004046,
                    "lng": -74.0014821,
                    "distance": 132,
                    "postalCode": "10038",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1c5941735",
                        "name": "Sandwich Place",
                        "pluralName": "Sandwich Places",
                        "shortName": "Sandwiches",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/food/sandwiches_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 12,
                    "usersCount": 11,
                    "tipCount": 1
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ed3af19b634dd29955299e1",
                "name": "18th Floor Executive Wash Room",
                "contact": {},
                "location": {
                    "address": "88 Pine St, New York, NY 10005",
                    "lat": 40.70023478199182,
                    "lng": -74.00014862936236,
                    "distance": 28,
                    "postalCode": "10005",
                    "city": "New York",
                    "state": "New York"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d174941735",
                        "name": "Coworking Space",
                        "pluralName": "Coworking Spaces",
                        "shortName": "Coworking Space",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/building/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 2,
                    "usersCount": 1,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ecbf226cc214a29d1c92f59",
                "name": "55 Water Street, 19th floor Boardroom",
                "contact": {},
                "location": {
                    "lat": 40.701388981975306,
                    "lng": -74.000249,
                    "distance": 156,
                    "postalCode": "10005",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 4,
                    "usersCount": 2,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4e4e4df6bd4101d0d7a745b6",
                "name": "Shinju Sushi",
                "contact": {
                    "phone": "2123610028",
                    "formattedPhone": "(212) 361-0028"
                },
                "location": {
                    "address": "164 Pearl St",
                    "lat": 40.709926943299756,
                    "lng": -74.00441785571343,
                    "distance": 1166,
                    "postalCode": "10005",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1d2941735",
                        "name": "Sushi Restaurant",
                        "pluralName": "Sushi Restaurants",
                        "shortName": "Sushi",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/food/sushi_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 4,
                    "usersCount": 4,
                    "tipCount": 1
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ec4256349017fff086173e5",
                "name": "Infopeople",
                "contact": {},
                "location": {
                    "address": "99 Wall Street 17th Floor",
                    "crossStreet": "Water Street",
                    "lat": 40.7004046,
                    "lng": -74.0018171,
                    "distance": 159,
                    "postalCode": "10005",
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d124941735",
                        "name": "Office",
                        "pluralName": "Offices",
                        "shortName": "Corporate / Office",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/building/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 1,
                    "usersCount": 1,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ecfc43c6c2510ace024bcea",
                "name": "Swagnation",
                "contact": {},
                "location": {
                    "lat": 40.70212173461914,
                    "lng": -73.99803161621094,
                    "distance": 288,
                    "postalCode": "10004"
                },
                "categories": [
                    {
                        "id": "4deefb944765f83613cdba6e",
                        "name": "Historic Site",
                        "pluralName": "Historic Sites",
                        "shortName": "Historic Site",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/arts_entertainment/museum_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 6,
                    "usersCount": 2,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4e2ee1ff483b93c2f2d97eb0",
                "name": "BGC Partners",
                "contact": {},
                "location": {
                    "lat": 40.7021361,
                    "lng": -74.0014744,
                    "distance": 268,
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4d4b7105d754a06375d81259",
                        "name": "Professional & Other Places",
                        "pluralName": "Professional & Other Places",
                        "shortName": "Professional & Other Places",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/building/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 16,
                    "usersCount": 5,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4d3f922e89616dcb96cafbb4",
                "name": "Willow street",
                "contact": {},
                "location": {
                    "lat": 40.697818,
                    "lng": -73.995348,
                    "distance": 461
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 45,
                    "usersCount": 8,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ae62580f964a52011a521e3",
                "name": "Danish Seamen's Church",
                "contact": {},
                "location": {
                    "address": "102 Willow st",
                    "lat": 40.698107,
                    "lng": -73.995596,
                    "distance": 427,
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 61,
                    "usersCount": 27,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ebac60a0cd6904066e4108f",
                "name": "Brookyn Bridge Park Greenway",
                "contact": {},
                "location": {
                    "address": "Fulton Ferry Landing to Atlantic Ave.",
                    "lat": 40.70025980212479,
                    "lng": -73.99698615074158,
                    "distance": 255,
                    "postalCode": "11201",
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d163941735",
                        "name": "Park",
                        "pluralName": "Parks",
                        "shortName": "Park",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 3,
                    "usersCount": 2,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4dcc6cc3b0fb44b81e464182",
                "name": "Brooklyn Bridge Dance Party",
                "contact": {},
                "location": {
                    "address": "Pier 1",
                    "lat": 40.701503,
                    "lng": -73.99663,
                    "distance": 329,
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d163941735",
                        "name": "Park",
                        "pluralName": "Parks",
                        "shortName": "Park",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 18,
                    "usersCount": 15,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4cb9e251adcd54817d881fa2",
                "name": "The Smoking Circle",
                "contact": {},
                "location": {
                    "lat": 40.699796,
                    "lng": -73.99595493333334,
                    "distance": 342
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 62,
                    "usersCount": 6,
                    "tipCount": 1
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4c704f0334443704e4cc235f",
                "name": "Spiral Pool",
                "contact": {},
                "location": {
                    "lat": 40.69888,
                    "lng": -73.997011,
                    "distance": 281,
                    "postalCode": "11201",
                    "city": "Brooklyn",
                    "state": "New York"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d165941735",
                        "name": "Scenic Lookout",
                        "pluralName": "Scenic Lookouts",
                        "shortName": "Scenic Lookout",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 10,
                    "usersCount": 10,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ea0156630f854cd9c288a75",
                "name": "99 Wall Street Coffee/bagel Cart",
                "contact": {},
                "location": {
                    "lat": 40.703174,
                    "lng": -74.002968,
                    "distance": 433,
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1cb941735",
                        "name": "Food Truck",
                        "pluralName": "Food Trucks",
                        "shortName": "Street Food",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/food/streetfood_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 16,
                    "usersCount": 3,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4c2fbe00ed37a59340d86703",
                "name": "Fort Stirling Park",
                "contact": {},
                "location": {
                    "address": "Columbia Heights",
                    "crossStreet": "Clark St",
                    "lat": 40.69851,
                    "lng": -73.996118,
                    "distance": 367,
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d163941735",
                        "name": "Park",
                        "pluralName": "Parks",
                        "shortName": "Park",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 64,
                    "usersCount": 25,
                    "tipCount": 1
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4e729560fa767a2b30fbfed3",
                "name": "Destiny",
                "contact": {},
                "location": {
                    "lat": 40.701725,
                    "lng": -73.996778,
                    "distance": 332
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1e0941735",
                        "name": "Harbor or Marina",
                        "pluralName": "Harbors or Marinas",
                        "shortName": "Harbor / Marina",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/harbor_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 5,
                    "usersCount": 5,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4df0b99e7d8ba370a0104ba1",
                "name": "Knickerbocker Village Elevator Hatch",
                "contact": {},
                "location": {
                    "lat": 40.7019607,
                    "lng": -73.9967147,
                    "distance": 352
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 5,
                    "usersCount": 2,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4e89e79a46909b71217a284a",
                "name": "bian dang Taiwanese Food Truck",
                "contact": {},
                "location": {
                    "crossStreet": "Front Street and Gouverneur Lane",
                    "lat": 40.7024047,
                    "lng": -73.9974088,
                    "distance": 345,
                    "city": "New York",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1cb941735",
                        "name": "Food Truck",
                        "pluralName": "Food Trucks",
                        "shortName": "Street Food",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/food/streetfood_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 4,
                    "usersCount": 4,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4b7c8bedf964a5202c9a2fe3",
                "name": "160 Columbia Heights",
                "contact": {},
                "location": {
                    "address": "160 Columbia Heights",
                    "lat": 40.698449,
                    "lng": -73.996528,
                    "distance": 340,
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 83,
                    "usersCount": 15,
                    "tipCount": 1
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4c3a5ad83849c92880e0c2b1",
                "name": "Blue Marble Ice Cream",
                "contact": {},
                "location": {
                    "address": "Brooklyn Bridge Park - Pier 1",
                    "lat": 40.70136599888968,
                    "lng": -73.99794101715088,
                    "distance": 230,
                    "postalCode": "11201",
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1c9941735",
                        "name": "Ice Cream Shop",
                        "pluralName": "Ice Cream Shops",
                        "shortName": "Ice Cream",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/food/icecream_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 68,
                    "usersCount": 60,
                    "tipCount": 3
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4e2617827d8b5ea72470c30c",
                "name": "Brooklyn Bridge Park Dog Free Grass",
                "contact": {},
                "location": {
                    "lat": 40.699304,
                    "lng": -73.996362,
                    "distance": 316,
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d165941735",
                        "name": "Scenic Lookout",
                        "pluralName": "Scenic Lookouts",
                        "shortName": "Scenic Lookout",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 12,
                    "usersCount": 12,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4bb9119f98c7ef3b8dc13102",
                "name": "Patricias",
                "contact": {},
                "location": {
                    "crossStreet": "Grand and whythe",
                    "lat": 40.7023809,
                    "lng": -73.9974017,
                    "distance": 343,
                    "city": "New York",
                    "state": "New York"
                },
                "categories": [],
                "verified": false,
                "stats": {
                    "checkinsCount": 5,
                    "usersCount": 5,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4c48dc0520ab1b8d6118fd15",
                "name": "Movies With A View",
                "contact": {},
                "location": {
                    "lat": 40.701676,
                    "lng": -73.99734,
                    "distance": 291,
                    "country": "USA"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d162941735",
                        "name": "Other Great Outdoors",
                        "pluralName": "Other Great Outdoors",
                        "shortName": "Other Outdoors",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/parks_outdoors/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 344,
                    "usersCount": 292,
                    "tipCount": 3
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4ea6c238cc219396a4873a6d",
                "name": "The Beverage works",
                "contact": {},
                "location": {
                    "lat": 40.6977604,
                    "lng": -74.0010626,
                    "distance": 264
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d124941735",
                        "name": "Office",
                        "pluralName": "Offices",
                        "shortName": "Corporate / Office",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/building/default_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": false,
                "stats": {
                    "checkinsCount": 1,
                    "usersCount": 1,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            },
            {
                "id": "4dd28adf814d415b7694b861",
                "name": "Sing for Hope Pop-Up Piano - Brooklyn Bridge Park",
                "contact": {
                    "phone": "2129665955",
                    "formattedPhone": "(212) 966-5955",
                    "twitter": "singforhope"
                },
                "location": {
                    "address": "Furman St",
                    "crossStreet": "Old Fulton St",
                    "lat": 40.70240710847517,
                    "lng": -73.9969539642334,
                    "distance": 371,
                    "city": "Brooklyn",
                    "state": "NY"
                },
                "categories": [
                    {
                        "id": "4bf58dd8d48988d1e5931735",
                        "name": "Music Venue",
                        "pluralName": "Music Venues",
                        "shortName": "Music Venue",
                        "icon": {
                            "prefix": "https://foursquare.com/img/categories/arts_entertainment/musicvenue_",
                            "sizes": [
                                32,
                                44,
                                64,
                                88,
                                256
                            ],
                            "name": ".png"
                        },
                        "primary": true
                    }
                ],
                "verified": true,
                "stats": {
                    "checkinsCount": 20,
                    "usersCount": 20,
                    "tipCount": 0
                },
                "hereNow": {
                    "count": 0
                }
            }
        ]
    }
}*/
});