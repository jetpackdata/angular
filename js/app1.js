
var app=angular.module("MyApp",[]);

app.controller("ChoreCtrl", function($scope){
    alert("hi");
});

app.directive("kid",function(){
  return {
    restrict:"E",
    template:'<input type="text" ng-model="chore">'+'{{chore}}'+'<div class="button">I\'m done</div>'
  }
});
