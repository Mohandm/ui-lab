'use strict';

/**
 * @ngdoc function
 * @name uiLabApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the uiLabApp
 */
angular.module('uilabApp')
    .factory('PageService', function ($firebaseObject) {
        var ref = new Firebase("https://ui-lab.firebaseio.com/pagesTest");
        var service = {

            postNewPage: postNewPage,
            updatePage: updatePage,
            getPages: getPages
        };

        return service;

        function postNewPage(json) {
            ref.child('lc').set(JSON.stringify(json));
          /*  var newPostRef = ref.push();

            var pageID = newPostRef.key();
            console.log('Page Id = ' + pageID);
            console.log('URL = https://ui-lab.firebaseio.com/pagesTest/' + pageID);*/
            console.log('URL = https://ui-lab.firebaseio.com/pagesTest/lc');
          /*  newPostRef.set(json);*/
        }

        function updatePage() {
            pages.$add(json).then(function (response) {
                console.log(response);
            });

        }

        function getPages() {
            pages.$loaded()
                .then(function (x) {
                    return list;
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        }

    });