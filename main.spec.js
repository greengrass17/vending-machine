var VendingMachine = require('./main')
var expect = require('chai').expect

var vm, price;
describe('Coin stack: {1:1, 2:0, 4:3, 6:2}', function () {
  before(function () {
    vm = new VendingMachine({1:1, 2:0, 4:3, 6:2})
  })
  describe('to buy an item with price: 12', function () {
    before(function () {
      price = 12
    })
    it('using credit: {1:3, 4:2} to have insufficient balance', function () {
      expect(vm.vending(price, {1:3, 4:2})).to.deep.equal({1:3, 4:2})
    })
    it('using credit: {1:1, 5:2} to have invalid balance', function () {
      expect(vm.vending(price, {1:1, 5:2})).to.deep.equal({1:1, 5:2})
    })
    it('using credit: {4:3} to be exact price', function () {
      expect(vm.vending(price, {4:3})).to.deep.equal({})
    })
    it('using credit: {6:1, 2:3} to be exact price', function () {
      expect(vm.vending(price, {6:1, 2:3})).to.deep.equal({})
    })
    it('using credit: {6:2} to be exact price', function () {
      expect(vm.vending(price, {6:2})).to.deep.equal({})
    })
    it('using credit: {6:1, 4:2} to return {2:1}', function () {
      expect(vm.vending(price, {6:1, 4:2})).to.deep.equal({2:1})
    })
    it('using credit: {6:4} to return {6:2}', function () {
      expect(vm.vending(price, {6:4})).to.deep.equal({6:2})
    })
    it('using credit: {6:4, 3:4} to return {3:4, 6:4}', function () {
      expect(vm.vending(price, {6:4, 3:4})).to.deep.equal({3:4, 6:4})
    })
    it('using credit: {4:5} to return {2:1, 6:1}', function () {
      expect(vm.vending(price, {4:5})).to.deep.equal({2:1, 6:1})
    })
  })
  describe('to buy item with price: 17', function () {
    before(function () {
      price = 17
    })
    it('using credit: {4:4, 2:1} to return {1:1}', function () {
      expect(vm.vending(price, {4:4, 2:1})).to.deep.equal({1:1})
    })
    it('using credit: {4:4, 2:1} to return {}', function () {
      expect(vm.vending(price, {4:4, 2:1})).to.deep.equal({})
    })
  })
})
describe('Coin stack: {1:0, 3:2, 5:1, 8:0}', function () {
  before(function () {
    vm = new VendingMachine({1:0, 3:2, 5:1, 8:0})
    price = 9
  })
  describe('to buy an item with price: 9', function () {
    it('using credit: {8:2} to return {3:2}', function () {
      expect(vm.vending(price, {8:2})).to.deep.equal({3:2})
      expect(vm.coins).to.deep.equal({1:0, 3:0, 5:1, 8:2})
    })
  })
})
describe('Coin stack: {20:0, 9:2, 5:2}', function () {
  before(function () {
    vm = new VendingMachine({20:0, 9:2, 5:2})
    price = 1
  })
  describe('to buy an item with price: 1', function () {
    it('using credit: {20:1} to return {5:2, 9:1}', function () {
      expect(vm.vending(price, {20:1})).to.deep.equal({5:2, 9:1})
      expect(vm.coins).to.deep.equal({5:0, 9:1, 20:1})
    })
  })
})
describe('Coin stack: {20:0, 9:2, 5:2, 1:19}', function () {
  before(function () {
    vm = new VendingMachine({20:0, 9:2, 5:2, 1:19})
    price = 1
  })
  describe('to buy an item with price: 1', function () {
    it('using credit: {20:1, 9:1} to return {20:1, 5:1, 1:3}', function () {
      expect(vm.vending(price, {20:1, 9:1})).to.deep.equal({20:1, 5:1, 1:3})
      expect(vm.coins).to.deep.equal({1:16, 5:1, 9:3, 20:0})
    })
  })
})
