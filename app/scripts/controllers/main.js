'use strict';

/**
 * @ngdoc function
 * @name hnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hnApp
 */
angular.module('hnApp')
    .controller('MainCtrl', ['$scope', 'HnFire', '$timeout', function ($scope, HnFire, $timeout) {
        var me = this;
        me.storyTypes = [
            'top',
            'new',
            'best',
            'ask',
            'show',
            'job'
        ];
        me.tempData = [];
        me.fetching = true;
        me.stories = {};
        me.selectStories = function(index) {
            me.currentIndex = me.currentIndex !== index ? index : undefined;
        };
        $scope.$watch(function() { return me.currentIndex; }, function(newVal) {
            if(newVal >= 0 && !me.stories[me.storyTypes[newVal]]) { me.fetching = true; }
            if(newVal >= 0 && me.storyTypes[newVal] && !me.stories[me.storyTypes[newVal]]) {
                $timeout(function() {
                    me.stories[me.storyTypes[newVal]] = me.tempData[newVal] = HnFire.getStories(me.storyTypes[newVal]);
                    me.fetching = false;
                }, 200);
            }
        });

        /* keyboard events */
        window.onkeydown = function (event) {
            switch (event.keyCode) {
                case 27:
                    me.currentIndex = undefined;
                    break;
                case 37:
                    me.currentIndex = me.currentIndex ? me.currentIndex - 1 : me.storyTypes.length - 1;
                    break;
                case 39:
                    me.currentIndex = me.currentIndex < me.storyTypes.length - 1 ? me.currentIndex + 1 : 0;
                    break;
            }
            $scope.$apply();
        };
    }]);
