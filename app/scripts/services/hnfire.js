'use strict';

/**
 * @ngdoc service
 * @name hnApp.HnFire
 * @description
 * # HnFire
 * Service that fetches Hacker News data using firebase sdk.
 */
angular.module('hnApp').service('HnFire', ['Firebase', '$firebaseArray', '$firebaseObject',
    function (Firebase, $firebaseArray, $firebaseObject) {
        if (!Firebase) { throw 'Firebase is not loaded'; }

        var me = this,
        props = {
            rootPath: 'https://hacker-news.firebaseio.com/v0/',
            storyTypes: {
                top:    'topstories',
                new:    'newstories',
                best:   'beststories',
                ask:    'askstories',
                show:   'showstories',
                job:    'jobstories',
            },
        },
        dataCache = {
            story: {},
            item: {},
            stories: []
        };

        me.getItem = function (id) {
            if (!id) { return; }

            if (!dataCache.item[id]) {
                var itemRef = new Firebase(props.rootPath + 'item/' + id);
                var itemObj = $firebaseObject(itemRef);
                // loadKids(itemObj);
                dataCache.item[id] = {
                    ref: itemRef,
                    obj: itemObj
                };
                dataCache.stories.push(itemObj);
            }

            return dataCache.item[id].obj;
        };

        me.getStoryIds = function (type) {
            if (!props.storyTypes[type]) { type = 'top'; }

            if (!dataCache.story[type]) {
                var storyRef = new Firebase(props.rootPath + props.storyTypes[type]);
                storyRef.limitToLast(25); // limitToLast supposed to work but doesn't
                dataCache.story[type] = {
                    ref: storyRef,
                    ids: $firebaseArray(storyRef),
                    items: []
                };
            }

            return dataCache.story[type].ids;
        };

        me.getStories = function (type) {
            var idList = me.getStoryIds(type);
            idList.$loaded(function(data) {
                for(var i = 0; i < data.length; i++) {
                    dataCache.story[type].items.push(me.getItem(data[i].$value));
                }
            });

            return dataCache.story[type];
        };

        me.getStoryTypes = function () {
            return props.storyTypes;
        };

    }]);
