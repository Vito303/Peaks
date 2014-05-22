// document ready
//$(function () { 
//});

var myapp = angular.module('myapp', []);

myapp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: 'partials/mainView.html', controller: 'vrhoviMainCtrl'})
        .when('/tabView', {templateUrl: 'partials/tabView.html', controller: 'vrhoviTabCtrl'})
        .when('/mapView', {templateUrl: 'partials/mapView.html', controller: 'vrhoviMapCtrl'})
        .otherwise({redirectTo: '/'});
});

myapp.factory('DataSource', ['$http',function($http){
       return {
           get: function(callback){
                $http.get(
                    'data/peak_data.xml',
                    {transformResponse:function(data) {
                        // convert the data to JSON and provide
                        // it to the success function below
                        console.log("transform data");
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json(data);
                        return json.vrhovi.vrh;
                        }
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }]);

myapp.controller('vrhoviTabCtrl', function ($scope, Page, DataSource) {
    //This is the callback function
    setData = function(data) {
        console.log("data set");
        $scope.dataSet = data;
    };

    Page.setTitle('Iskanje');
    console.log("data set");
    DataSource.get(setData);
});

myapp.controller('vrhoviMapCtrl', function ($scope, Page, DataSource) {
    //This is the callback function
    setData = function(data) {
        console.log("data set");
        $scope.dataSet = data;

        angular.element(document).ready(function () {
          setMap();
          $scope.dataSet.forEach(function(item) {
              //console.log(item);
              setMark(item);
          });            
        });        
    };

    Page.setTitle('Zemljevid');
    console.log("data set");
    DataSource.get(setData);
});

myapp.controller('vrhoviMainCtrl', function ($scope, Page) {
  Page.setTitle('Doma');
});

myapp.controller('initPageCtrl', function ($scope, Page) {
  $scope.Page = Page;
});

myapp.factory('Page', function() {
   var title = 'default';
   return {
     title: function() { return title; },
     setTitle: function(newTitle) { title = newTitle }
   };
});

