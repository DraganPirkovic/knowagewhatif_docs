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
