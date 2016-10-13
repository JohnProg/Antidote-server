const { expect } = require('chai');
const proxyquire = require('proxyquire');
const successful = 'successful';
let stub = {
  '../models/user': {
    findOne(obj, callback) {
      return callback(null, { successful });
    },
  },
};
let authenticate = proxyquire('./authenticate', stub);

describe('authenticate.js', () => {
  it('should be successful', (done) => {
    const request = {
      query: {
        accessToken: 'fooo',
      },
      app: {
        auth0: {
          users: {
            getInfo(accessToken) {
              expect(accessToken).to.be.equal('fooo');
              return Promise.resolve(JSON.stringify({ successful }));
            },
          },
        },
      },
    };
    authenticate(request, {}, function () {
      done();
    });
  });
  it('should fail if the user is not found', (done) => {
    const request = {
      query: {
        accessToken: 'fooo',
      },
      app: {
        auth0: {
          users: {
            getInfo(accessToken) {
              expect(accessToken).to.be.equal('fooo');
              return Promise.resolve(JSON.stringify({ successful }));
            },
          },
        },
      },
    };
    stub = {
      '../models/user': {
        findOne(obj, callback) {
          return callback('we failed', null);
        },
      },
    };
    authenticate = proxyquire('./authenticate', stub);
    authenticate(request, {
      json(result) {
        expect(result.success).to.be.false;
        expect(result.err).to.be.equal('we failed');
        done();
      },
    }, () => {});
  });
});
