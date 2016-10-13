const userController = require('./userController');
const { expect } = require('chai');
const User = require('../models/user');
const sinon = require('sinon');
const _ = require('lodash');

describe('userController', () => {
  const userData = {
    phoneNumber: 'foo',
    name: 'foo',
    licensePlate: 'foo',
    available: false,
    car: {
      make: 'bar',
      model: 'foo',
      color: 'blue',
    },
    responding: false,
  };

  describe('postLogin', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());
    it('handles post to login correctly', () => {
      const req = { body: userData };
      const res = { json: sandbox.stub() };
      _.set(req, 'app.auth0.passwordless.signIn', sinon.stub().returns(Promise.resolve()));
      const handleLoginRequestStub = sandbox.stub(userController, 'handleLoginRequest');
      userController.postLogin(req, res);
      expect(req.app.auth0.passwordless.signIn.callCount).to.equal(1);
      expect(res.json.callCount).to.equal(0);
    });
  });

  describe('handleLoginRequest', () => {
    let sandbox;
    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    const response = { access_token: 'foo' };
    const mockUser = { foo: 'bar' };

    it('handles correctly', () => {
      const findOneAndUpdateStub = sandbox.stub(User, 'findOneAndUpdate').returns(Promise.resolve(mockUser));
      const res = { json: sandbox.stub() };
      return userController.handleLoginRequest(userData, res, response)
        .then(() => {
          expect(findOneAndUpdateStub.callCount).to.equal(1);
          expect(res.json.callCount).to.equal(1);
          expect(res.json.firstCall.args[0]).to.eql({
            user: mockUser,
            access_token: response.access_token,
            success: true,
          });
        });
    });

    it('handles an error', () => {
      const findOneAndUpdateStub = sandbox.stub(User, 'findOneAndUpdate')
      .returns(Promise.reject(new Error('lol error')));
      const res = { json: sandbox.stub() };
      return userController.handleLoginRequest(userData, res, response)
        .then(() => {
          expect(findOneAndUpdateStub.callCount).to.equal(1);
          expect(res.json.callCount).to.equal(1);
          expect(res.json.firstCall.args[0]).to.eql({ error: new Error('lol error'), success: false });
        });
    });
  });
});
