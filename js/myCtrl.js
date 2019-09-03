var myVariable = document.createElement('canvas').getContext != undefined;  
  
        if (myVariable) {  
            initiateLocalStorage();  
  
        }  
  
        function initiateLocalStorage() {  
            // Create the AngularJS app   
            var app = angular.module('myTrip', ['storageService']);  

            // Create the Controller  
            app.controller('myController', ['$scope', 'getLocalStorage', function ($scope, getLocalStorage) {  
                //Read the Trip List from LocalStorage  
                $scope.mytrips = getLocalStorage.getmyTrip();  
                $scope.addbtn = true;

                //Count the Trip List  
                $scope.count = $scope.mytrips.length;  
                
                
                $scope.addtrips = function () {
                    $scope.updatebtn = false;
                    $scope.addbtn = true;


                    $scope.mytrips.push({'startingL': $scope.startingL, 'endingL': $scope.endingL, 'tripN': $scope.tripN, 'duration': $scope.duration });  
                    getLocalStorage.updatemyTrip($scope.mytrips); 
                    $scope.startingL = '';  
                    $scope.endingL = '';  
                    $scope.tripN = '';
                    $scope.duration = '';  
                    $scope.count = $scope.mytrips.length;  
                };  
  
                //Delete Trip - Using AngularJS splice to remove the trp row from the Trip list  
                $scope.deletemyTrip = function (index) {  
                      alert(index);     
                      $scope.mytrips.splice(index, 1);
                      localStorage.removeItem(index);
                      getLocalStorage.updatemyTrip($scope.mytrips);  
                      $scope.count = $scope.mytrips.length; 
                };  
                $scope.edit = function(index,startingL,endingL,tripN,duration) 
                {
                    $scope.updatebtn = true;
                    $scope.addbtn = false;

                    $scope.index = index;
                    $scope.startingL = startingL;
                    $scope.endingL = endingL;
                    $scope.tripN = tripN;
                    $scope.duration=duration;
                } 
                $scope.update = function()
                {
                    alert($scope.index);
                    var tripsdata = JSON.parse(localStorage.getItem("mytrips"));
                    tripsdata[$scope.index].startingL =$scope.startingL;
                    tripsdata[$scope.index].endingL =$scope.endingL;
                    tripsdata[$scope.index].tripN =$scope.tripN;
                    tripsdata[$scope.index].duration =$scope.duration;
                    localStorage.setItem("mytrips",JSON.stringify(tripsdata));
                    $scope.mytrips = getLocalStorage.getmyTrip();  
   
                }    

            }]);  
  
            //Create the Storage Service Module  
            //Create getLocalStorage service to access UpdateTrip and getTrip method  
            var storageService = angular.module('storageService', []);  
            storageService.factory('getLocalStorage', function () {  
                var tripList = {};  
                return {  
                    list: tripList,  
                    updatemyTrip: function (myTripArr) {  
                        if (window.localStorage && myTripArr) {  
                            localStorage.setItem("mytrips", angular.toJson(myTripArr));  
                        }  
                        tripList = myTripArr;  
  
                    },  
                    getmyTrip: function () {  
                        //Get data from Local Storage  
                        tripList = angular.fromJson(localStorage.getItem("mytrips"));  
                        console.log(tripList);
                        return tripList ? tripList : [];  
                    }  
                };  
  
            });  
        }  