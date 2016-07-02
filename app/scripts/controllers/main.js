'use strict';

/**
 * @ngdoc function
 * @name hnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hnApp
 */
angular.module('hnApp')
    .controller('MainCtrl', ['$scope', 'HnFire', function ($scope, HnFire) {
        var me = this;
        me.storyTypes = [
            'top',
            'new',
            'best',
            'ask',
            'show',
            'job'
        ];
        me.currentIndex = 0;
        me.tempData = [];
        me.fetching = true;
        me.stories = [];
        // me.tempData[me.currentIndex] = HnFire.getStories(me.storyTypes[me.currentIndex]);

        // $scope.$watch(function () { return me.tempData[me.currentIndex]; }, function (newVal) {
        //     if(newVal && newVal.length) {
        //         me.stories[me.currentIndex] = newVal;
        //         me.fetching = false;
        //     }
        // });

        $scope.$watch(function() { return me.currentIndex; }, function(newVal, oldVal) {
            if(newVal !== oldVal && !me.stories[newVal]) { me.fetching = true; }
            console.log(me.storyTypes[newVal], me.stories[newVal] && me.stories[newVal].length);
            if(newVal >= 0 && me.storyTypes[newVal] && !me.stories[newVal]) {
                (function(){

                        me.stories[newVal] = me.tempData[newVal] = HnFire.getStories(me.storyTypes[newVal]);

                        me.fetching = false;

                })();
            }
        });
    }]);
