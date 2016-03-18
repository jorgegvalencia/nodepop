'use strict';

var utils = {
  // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  validateEmail: function (email) {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },

  mergeArrays: function (array1, array2) {
    let aux = array1.concat(array2);
    let result = aux.filter(function (item, pos) {
      return aux.indexOf(item) == pos;
    });

    return result;
  },

  dbErrorResponse: function (err) {
    if (err.errmsg && err.errmsg.indexOf('nombre_1 dup key') > -1) {
      return 'Username already exists.';
    } else if (err.errmsg && err.errmsg.indexOf('email_1 dup key') > -1) {
      return 'Email already in use.';
    }

    return 'Service currently unavailable.';
  }
};

module.exports = utils;
