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
