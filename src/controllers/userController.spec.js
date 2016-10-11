const userController = require('./userController')
const { expect } = require('chai')
const User = require('../models/user');
const sinon = require('sinon')

describe('userController', () => {
  
  describe('handleLoginRequest', () => {
    let sandbox
    beforeEach(() => sandbox = sinon.sandbox.create())
    afterEach(() => sandbox.restore())

    const userData = {
      phoneNumber: 'foo', 
      name: 'foo',
      licensePlate: 'foo', 
      available: false,
      car: { 
        make: 'bar',
        model: 'foo',
        color: 'blue'
      },
      responding: false,
    }

    it('handles correctly', () => {
      const res = { json: sinon.stub() }
      const response = { access_token: 'foo' }
      const mockUser = { foo: 'bar' }
      const findOneAndUpdateStub = sandbox.stub(User, 'findOneAndUpdate').returns(Promise.resolve(mockUser))
      
      return userController.handleLoginRequest(userData, res, response)
        .then(() => {
          expect(findOneAndUpdateStub.callCount).to.equal(1)
          expect(res.json.callCount).to.equal(1)
          expect(res.json.firstCall.args[0]).to.eql({ user: mockUser, access_token: response.access_token, success: true})
        })
    });

    it('handles an error', () => {
      const res = { json: sandbox.stub() }
      const response = { access_token: 'foo' }
      const mockUser = { foo: 'bar'}
      const findOneAndUpdateStub = sandbox.stub(User, 'findOneAndUpdate').returns(Promise.reject(new Error('lol error')))

      return userController.handleLoginRequest(userData, res, response)
        .then(() => {
          expect(findOneAndUpdateStub.callCount).to.equal(1)
          expect(res.json.callCount).to.equal(1)
          expect(res.json.firstCall.args[0]).to.eql({ error: new Error('lol error'), success: false})
        })
    });
  });

});