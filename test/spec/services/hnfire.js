'use strict';

describe('Service: HnFire', function () {

  // load the service's module
  beforeEach(module('hnApp'));

  // instantiate service
  var HnFire;
  beforeEach(inject(function (_HnFire_) {
    HnFire = _HnFire_;
  }));

  it('should do something', function () {
    expect(!!HnFire).toBe(true);
  });

});
