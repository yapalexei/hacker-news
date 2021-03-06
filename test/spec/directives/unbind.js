'use strict';

describe('Directive: unbind', function () {

  // load the directive's module
  beforeEach(module('hnApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<unbind></unbind>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the unbind directive');
  }));
});
