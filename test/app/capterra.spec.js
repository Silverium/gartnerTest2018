/* global describe, it, */
'use strict';

const
  chai = require('chai'),
  expect = chai.expect;

const CapterraController = require('../../app/capterra');
describe('Normalize capterra origin', () => {

  describe('loading module YAML', () => {
    it('should load a YAML file as JSON', () => {
      const loadData = CapterraController.loadData;
      const url = 'test/resources/capterra.yaml';
      const jsonObject = loadData(url);

      expect(jsonObject).to.be.an.instanceOf(Object);
    });
  });

  describe('Normalize Data', () => {
    const data = {
      name: 'Hello',
      tags: 'Cat1,Cat2',
      twitter: '@hello'
    };
    it('should normalize an object with categories as tags', () => {
      const normalizeData = CapterraController.normalizeData;
      const jsonObject = normalizeData(data);

      expect(jsonObject.categories).to.equal(data.tags);
    });
  });

  // I would do more tests with more complex data and edge cases.

});