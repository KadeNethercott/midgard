'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('harmonia', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /myReviews when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/myReviews");
  });


  describe('myReviews', function() {

    beforeEach(function() {
      browser().navigateTo('#/myReviews');
    });


    it('should render myReviews when user navigates to /myReviews', function() {
      expect(element('[ui-view] p:first').text()).
        toMatch(/partial for view 1/);
        console.log(element('[ui-view] p:first').text());
    });

  });

});
