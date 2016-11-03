const sendAlert = require('./sendAlert');
const { expect } = require('chai');
/*@eslintignore expect */

describe('Send alert', () => {
  it('return a promise given an alert', (done) => {
    sendAlert({})
    .then(function() {
      expect(true).to.be.true
      done();
    })
    .catch(function(error) {
      console.error(error);
    })
  });
});
