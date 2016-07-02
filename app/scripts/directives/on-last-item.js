'use strict';

/**
 * @ngdoc directive
 * @name hnApp.directive:onLastItem
 * @description
 * # onLastItem
 */
angular.module('hnApp')
  .directive('onLastItem', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            if(scope.$last) {
                scope.$eval(attrs.onLastItem);
            }
        },
    };
});
