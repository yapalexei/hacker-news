'use strict';

/**
 * @ngdoc directive
 * @name hnApp.directive:unbind
 * @description
 * # unbind
 */
angular.module('hnApp')
  .directive('unbind', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function postLink(scope) {
            $timeout(function() {
                scope.$destroy();
            });
        },
    };
}]);
