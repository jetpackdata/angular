
  var app=angular.module("MyApp",['ngResource']);

  app.controller("MyCtrl", function($scope){
    $scope.name="Peter";
    $scope.user={
      name:"parker"
    };
  });

  app.controller("MyNestedCtrl", function($scope){

  });

  app.factory("UserService", function(){
    var users=["peter","Dina","nino"];

    return {
      all:function(){
        return users;
      },
      first:function(){
        return users[0];
      }
    };
  });

app.controller("MyServiceCtrl", function($scope,UserService){
  $scope.users=UserService.all();
});

app.controller("anotherServiceCtrl", function($scope,UserService){
  $scope.firstUser=UserService.first();
});

app.directive("myWidget",function(){
  var linkFn=function(scope,element,attributes){
    var paragraph=element.children()[0];
    $(paragraph).on("click",function(){
      $(this).css({"background-color":"red"});
    });
  };
  
  return {
    restrict: "A",
    link:linkFn
  };
});

app.directive("myWidgeter", function(){
  return {
    restrict:"E",
    template:"<h1>Created myself through Directive</h1>"
  };
});

app.directive("myAnotherwidg", function(){
  return {
    restrict : "A",
    transclude: true,
    template: "<div ng-transclude><h3>Transcluding myself</h3></div>"
  };
});

app.directive("text", function(){
  return {
    restrict: "A",
    template: "<h1>{{text}}</h1>",
    scope:{
      text:"@text"
    }
  };
});

app.directive("repeatNtimes",function(){
  return {
    restrict: "E",
    compile: function (tElements,attrs){
        var content=tElements.children();
        for (var i=1;i<attrs.repeat;i++){
          tElements.append(content.clone());
        }
    }
  };
});

app.directive("basket",function(){
  return {
    restrict: "E",
    controller: function($scope,$element,$attrs){
      $scope.content=[];

      this.addApple=function(){
        $scope.content.push("apple");
      };

      this.addOrange=function(){
        $scope.content.push("orange");
      };
    },
    link:function(scope,element){
      element.bind("mouseenter",function(){
        console.log(scope.content);
      });
    }
  };
});

app.directive("apple",function(){
  return {
    require:"basket",
    link:function(scope,element,attrs,basketCtrl){
      basketCtrl.addApple();
    }
  };
});

app.directive("orange",function(){
  return {
    require:"basket",
    link:function(scope,element,attrs,basket){
      basket.addOrange();
    }
  };
});

app.filter("exclude",function(){
  return function(input,exclude){
    var result=[];
    for (var i=0;i<input.length;i++){
      if (input[i]!=exclude)
        result.push(input[i]);
    }

    return result;
  };
});

app.
  config(function ( $httpProvider) {        
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }).
  factory("Post", function($resource){
  return $resource('http://jet-packdata.rhcloud.com/api/v0/who');
});

app.controller("PostsCtrl", function($scope,$http){
  $http.get('js/data.json').
    success(function(data,status,headers,config){
      $scope.posts=data;
    }).
    error(function(data,status,headers,config){
      alert("errors");
    });
});


app.controller("PostsFacCtrl", function($scope,Post){
  Post.get(function(data){
    $scope.post=data;
  });
});

app.directive("contenteditable",function(){
  return {
    restrict:"A",
    require:"ngModel",
    link:function(scope,element,attrs,ngModel){
      alert(element);
      function read(){
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render=function(){
        element.html(ngModel.$viewValue||'');
      };

      element.bind("blur keyup change",function(){
        scope.$apply(read);
      });
    }
  };
});

