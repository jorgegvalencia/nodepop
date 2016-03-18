define({ "api": [
  {
    "type": "get",
    "url": "/adverts/detail/:ad",
    "title": "Get advert details.",
    "version": "1.0.0",
    "name": "GetAd",
    "group": "Ads",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ad",
            "description": "<p>Id of the requested ad.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "true",
            "description": "<p>Variable to indicate success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "ad",
            "description": "<p>Object with the ad data.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "._id",
            "description": "<p>Id of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "._v",
            "description": "<p>Version of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".name",
            "description": "<p>Title of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".sale",
            "description": "<p>Type of the ad: sale or search.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": ".price",
            "description": "<p>Price of the item.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".photo",
            "description": "<p>URL of the cover image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "ad.tags",
            "description": "<p>List of the tags related to the ad.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": true,\n  \"ad\": {\n    \"_id\": \"56ea993380429ac01b847f2a\",\n    \"_v\": 0,\n    \"name\": \"iPhone\",\n    \"sale\": \"true\",\n    \"price\": 500,\n    \"photo\": \"iphone.jpg\",\n    \"tags\": [\"mobile\", \"lifestyle\"]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404": [
          {
            "group": "404",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "404",
            "type": "Object",
            "optional": false,
            "field": "ad",
            "defaultValue": "null",
            "description": ""
          }
        ],
        "503": [
          {
            "group": "503",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "503",
            "type": "String",
            "optional": false,
            "field": "error",
            "defaultValue": "Service currently unavailable.",
            "description": "<p>String that describes the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  \"result\": false\n  \"error\": \"Service currently unavailable.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"result\": false\n  \"ad\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/anuncios.js",
    "groupTitle": "Ads"
  },
  {
    "type": "get",
    "url": "/adverts/",
    "title": "Get a list of existing ads.",
    "version": "1.0.0",
    "name": "GetAds",
    "group": "Ads",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tag",
            "description": "<p>Name of the tag to filter by.</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "allowedValues": [
              "\"true\"",
              "\"false\""
            ],
            "optional": true,
            "field": "sale",
            "description": "<p>Filter ads by sales (true) or searches (false).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"min-max\"",
              "\"min-\"",
              "\"-max\"",
              "\"exact\""
            ],
            "optional": true,
            "field": "price",
            "description": "<p>Range of the price of the ads.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Name of the article in the ad.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "allowedValues": [
              "\"name\"",
              "\"price\""
            ],
            "optional": true,
            "field": "sort",
            "defaultValue": "name",
            "description": "<p>Sort ads by name or price.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of the maximum results to return.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "offset",
            "description": "<p>For pagination purposes. Skip the first amount of ads defined by the offset.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "true",
            "description": "<p>Variable to indicate success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>Object with the filter options.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Array with the ads objects.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "._id",
            "description": "<p>Id of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "._v",
            "description": "<p>Version of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".name",
            "description": "<p>Title of the ad.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".sale",
            "description": "<p>Type of the ad: sale or search.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": ".price",
            "description": "<p>Price of the item.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": ".photo",
            "description": "<p>URL of the cover image.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "ad.tags",
            "description": "<p>List of the tags related to the ad.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": true,\n  \"rows\": [{\n    \"_id\": \"56ea993380429ac01b847f2a\",\n    \"_v\": 0,\n    \"name\": \"iPhone\",\n    \"sale\": \"true\",\n    \"price\": 500,\n    \"photo\": \"iphone.jpg\",\n    \"tags\": [\"mobile\", \"lifestyle\"]\n  },{\n    \"_id\": \"56ea993380429ac52b847f2a\",\n    \"_v\": 0,\n    \"name\": \"Biciteta\",\n    \"sale\": \"true\",\n    \"price\": 170,\n    \"photo\": \"biciteta.jpg\",\n    \"tags\": [\"mobile\", \"lifestyle\"]\n  }],\n  \"options\":{}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "400",
            "type": "String",
            "optional": false,
            "field": "error",
            "defaultValue": "Missing username and/or password.",
            "description": "<p>String that describes the error.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "401",
            "type": "String",
            "optional": false,
            "field": "error",
            "defaultValue": "Wrong password.",
            "description": "<p>String that describes the error.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "404",
            "type": "String",
            "optional": false,
            "field": "error",
            "defaultValue": "User does not exist.",
            "description": "<p>String that describes the error.</p>"
          }
        ],
        "503": [
          {
            "group": "503",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "false",
            "description": "<p>Variable to indicate failure.</p>"
          },
          {
            "group": "503",
            "type": "String",
            "optional": false,
            "field": "error",
            "defaultValue": "Service currently unavailable.",
            "description": "<p>String that describes the error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 503 Service Unavailable\n{\n  \"result\": false\n  \"error\": \"Service currently unavailable.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"result\": false\n  \"error\": \"Missing username and/or password.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"result\": false\n  \"error\": \"Wrong password.\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"result\": false\n  \"error\": \"User does not exist.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/anuncios.js",
    "groupTitle": "Ads"
  },
  {
    "type": "post",
    "url": "/signin",
    "title": "Register a new user.",
    "version": "1.0.0",
    "name": "SignIn",
    "group": "Sign_In",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Username.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "true",
            "description": "<p>Variable to indicate success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Object with the new user object.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user._v",
            "description": "<p>Version number.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Username of the new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Email of the new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.password",
            "description": "<p>Password hash of the new user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>Id of the new user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n \"result\": true,\n \"user\": {\n   \"_v\": 0,\n   \"name\": \"newuser\",\n   \"email\": \"email@example.com\",\n   \"password\": \"73bb31e779581af66b21a08a58c4549aa58fe16b131a554723c9155681601e9b\",\n   \"_id\": \"56ea964d8e05fffc13384d50\"\n }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/registro.js",
    "groupTitle": "Sign_In"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "Get the list of existent tags",
    "version": "1.0.0",
    "name": "GetTags",
    "group": "Tags",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "result",
            "defaultValue": "true",
            "description": "<p>Variable to indicate success.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "rows",
            "description": "<p>Object with the array of existent tags.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": ".tags",
            "description": "<p>Array of existent tags.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"result\": true,\n  \"rows\": {\n    \"tags\": [\"mobile\", \"lifestyle\"]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/v1/tags.js",
    "groupTitle": "Tags"
  }
] });
