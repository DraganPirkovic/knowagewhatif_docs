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