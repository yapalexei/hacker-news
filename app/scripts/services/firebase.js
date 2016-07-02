'use strict';

/**
 * @ngdoc service
 * @name hnApp.Firebase
 * @description
 * # Firebase
 * Factory providing the Firebase (third party) library.
 */
angular.module('hnApp')
  .factory('Firebase', ['$window', function ($window) {
    if ($window.Firebase) {
        //    Delete Firebase from window so it's not globally accessible.
        //    We can still get at it through _thirdParty however, more on why later
        $window._thirdParty = $window._thirdParty || {};
        $window._thirdParty.Firebase = $window.Firebase;
        try {
            delete $window.Firebase;
        } catch (e) {
            $window.Firebase = undefined;
            /*<IE8 doesn't do delete of window vars, make undefined if delete error*/
        }
        return $window._thirdParty.Firebase;
    }
    return;
  }]);
