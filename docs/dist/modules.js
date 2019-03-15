'use strict';

/**
 *
 * @ngdoc module
 * @name app
 * @module app
 * @packageName app
 * @description
 * This is a sample module.
 *
 **/
angular.module('app', []);


'use strict';

/**
 *
 * @ngdoc directive
 * @module app
 * @name sampleElem
 * @restrict E
 * @description 
 * This is a sample directive.
 *
 * @example
    <example module="sampleElemExample" deps="" animate="false">
      <file name="index.html">
        <sample-elem></sample-elem>
      </file>
      <file name="main.js">
        angular.module('sampleElemExample', ['app']);
      </file>
    </example>
 *
 **/
angular.module('app').directive('sampleElem', function () {
  return {
    restrict: 'E',
    templateUrl: '/components/sample/sampleElem.html'
  };
});

'use strict';

/**
 *
 * @ngdoc filter
 * @module app
 * @name sampleFilter
 * @description
 * This is a sample filter.
 *
 * @example
    <example module="sampleFilterExample" deps="" animate="false">
      <file name="index.html">
        <div ng-controller="MainCtrl as main">
          <input ng-model="main.input" />
          {{main.input | sampleFilter}}
        </div>
      </file>
      <file name="main.js">
        angular.module('sampleFilterExample', ['app']).controller('MainCtrl', function () {
          this.input = 'sample input';
        });
      </file>
    </example>
 *
 **/
angular.module('app').filter('sampleFilter', function () {
  return function (input) {
    return input.toUpperCase();
  };
});

'use strict';

/**
 *
 * @ngdoc provider
 * @module app
 * @name sampleServiceProvider
 * @description
 *
 * This provider allows you to configure {@link sampleService sampleService}.
 *
 **/
angular.module('app').provider('sampleService', function () {
  var msg = 'Default message.';
  return {

    /**
     *
     * @ngdoc method
     * @name sampleServiceProvider#setMessaage
     * @param {String} message A message.
     * @description
     * Configure {@link sampleService sampleService} message.
     *
     **/
    setMessage: function (message) {
      msg = message;
    },

    /**
     *
     * @ngdoc service
     * @module app
     * @name sampleService
     * @description
     *
     * Sample service. It returns the message.
     *
     * @example
        <example module="sampleServiceExample" deps="">
          <file name="index.html">
            <div ng-controller="MainCtrl as main">
              Message: {{main.message}}
            </div>
          </file>
          <file name="main.js">
            angular.module('sampleServiceExample', ['app'])
              .config(function (sampleServiceProvider) {
                sampleServiceProvider.setMessage('Hello, AngularJS service!');
              })
              .controller('MainCtrl', function (sampleService) {
                this.message = sampleService.getMessage();
              });
          </file>
        </example>
     *
     **/
    $get: function () {
      return {
        /**
         * 
         * @ngdoc method
         * @name sampleService#get
         * @return {String} message
         * @description
         *
         * Get the message.
         **/
        getMessage: function () {
          return msg;
        }
      };
    }
  };
});

/**
 *
 * @ngdoc service
 * @module app
 * @name selectedEntitiesRelationshipsService
 * @description
 *
 * This service gets selected entities.
 *
 **/

angular.module('app').service('selectedEntitiesRelationshipsService',function(){
	
	var objectToArray = function(obj){
		var array = [];
		for (var key in obj) {
		    array.push(obj[key])
		}
		
		return array;
	}
	
	var contains = function(array,object,arrayObjProperty,objProperty){
		for(var i = 0;i<array.length;i++){
			if(array[i][arrayObjProperty] === object[objProperty]){
				return true;
			}
		}
		
		return false;
	}
	
	var entityContainsField = function(entity,field){
		var entityFields = entity.children
		
		return contains(entityFields,field,'id','id');
	}
	
	var isSelectedEntityRelationship = function(relationship,selectedEntites){
		return contains(selectedEntites,relationship,'id','targetEntity')
	}
	
	
	
	var getSelectedEntites = function(fields,entities){
		var selectedEntities = {};
		for(var i = 0;i<fields.length;i++){
			for(var j = 0;j<entities.length;j++){
				if(entityContainsField(entities[j],fields[i])){
					selectedEntities[entities[j].id] = entities[j];
				}
			}
		}
		
		return objectToArray(selectedEntities);
	}
	
	var selectedEntityRelationships = function(selectedEntities){
		var selectedEntityRelationships = [];
		for(var i = 0;i<selectedEntities.length;i++){
			var relationships = selectedEntities[i].relation
			for(var j= 0;j<relationships.length;j++){
				if(isSelectedEntityRelationship(relationships[j],selectedEntities)){
					selectedEntityRelationships.push(relationships[j])
				}
			}
		}
		
		return selectedEntityRelationships;
	}
	
	return {
		
		/**
         * 
         * @ngdoc method
         * @name selectedEntitiesRelationshipsService#getRelationships
         * @return {array}
         * @description
         *
         * Getting relationships.
         **/
		
		getRelationships:function(fields,entites){
			var selectedEntities = getSelectedEntites(fields,entites)
			return selectedEntityRelationships(selectedEntities);
		}
	}
})
angular.module('windowCommunicatorModule').service('messageHandlerValidatorService',function(){
	
	var isNull = function(value){
		 return value === null || value === undefined;
	 }
	 
	 var isObject = function(obj){
			return  typeof obj === 'object' && obj.constructor === Object;
	}
	 
	 var isFunction = function(func){
			return  typeof func === 'function';
	}
	 
	 var hasHandleMessageFunction = function(messageHandler){
		 return !isNull(messageHandler.handleMessage) && isFunction(messageHandler.handleMessage);
	 }
	 
	 var isValidMessageHandler = function(messageHandler){
		 return !isNull(messageHandler) && isObject(messageHandler) && hasHandleMessageFunction(messageHandler)
	 }
	 
	 return{
		 isValid:isValidMessageHandler
	 }
	 
	 
	
})
/**
 *
 * @ngdoc provider
 * @module windowCommunicatorModule
 * @name windowCommunicationService
 * @description
 *
 * This service give you possibility to send messages to parent window.
 *
 **/

angular.module('windowCommunicatorModule').service('windowCommunicationService',["messageHandlerValidatorService", function(messageHandlerValidatorService){

			
			 var listeners = [];
			 var messageHandlers = [];
			 var messageHandlerValidator = messageHandlerValidatorService;
			 
			 var hasParent = function(){
				 return window !== window.parent;
			 }
			 
			 var sendConnectionRequest = function(){
				 window.parent.postMessage("handshake","*");
			 }
			 
			 var addListener = function(listener){
				 listeners.push(listener)
			 }
			 
			 var isConnectionRequest = function(event){
				 return event.data === "handshake";
			 }
			 
			 var broadcastMessage = function(message){
				 for(var i =0;i<listeners.length;i++){
						listeners[i].postMessage(message,"*");
					}
			 }
			 
			 var handleMessage = function(event){
				 for(var i = 0;i<messageHandlers.length;i++){
			 			messageHandlers[i].handleMessage(event.data);
				 }
			 }
		
			var eventLisneter = function(event){
				 
			 	if(isConnectionRequest(event)){
			 		addListener(event.source)
			 	}else{	
			 		handleMessage(event)
			 	}
				
			} 
			 var init = function(){
				 
				 if(hasParent()){
					 sendConnectionRequest();
					 addListener(window.parent);
				 }
				 window.addEventListener("message",eventLisneter, false);	
			 }
			 
			 init();
			 return {
					/**
         * 
         * @ngdoc method
         * @name windowCommunicationService#sendMessage
         * @return 
         * @description
         *
         * Send the message.
		 
		 @example
        <example module="windowCommunicatorModule" deps="">
          <file name="index.html">
            <div ng-controller="MainCtrl as main">
              Message: {{main.message}}
            </div>
          </file>
          <file name="main.js">
            angular.module('windowCommunicatorModule', ['app'])
              .config(function (sampleServiceProvider) {
                sampleServiceProvider.setMessage('Hello, AngularJS service!');
              })
              .controller('MainCtrl', function (sampleService) {
                this.message = sampleService.getMessage();
              });
          </file>
        </example>
     *
     **/
         
		 
		 
				 	sendMessage:function(message){broadcastMessage(message)},
			 
			 		addMessageHandler:function(messageHandler){
			 			if(messageHandlerValidator.isValid(messageHandler)){
			 				messageHandlers.push(messageHandler)
			 			}else{
			 				
			 				console.error("valid messageHandler must have function handleMessage(message)")
			 				console.error(messageHandler)
			 			}
			 			
			 		}
			 }
			 
			
			 
	 
}])
/**
 *
 * @ngdoc module
 * @module windowCommunicatorModule
 * @name windowCommunicatorModule
 * @description
 *
 * This service give you possibility to send messages to parent window.
 *
 **/

angular.module('windowCommunicatorModule',[]);
(function(module) {
try {
  module = angular.module('app');
} catch (e) {
  module = angular.module('app', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/components/sample/sampleElem.html',
    '<div class="sample-awesome">\n' +
    '  Hello, AngularJS directive!\n' +
    '</div>\n' +
    '');
}]);
})();
