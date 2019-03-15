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