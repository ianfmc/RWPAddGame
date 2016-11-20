var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');
var chai = require('chai');
var sinon = require('sinon');

var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Add a New Game', function() { 

	var callback;

	var teamCorrect;
	var teamNoSeason;
	var teamUnknownSeason;
	var teamNoplayers;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'get', function(params, callback) {
				if (params.Key.seasonID == 1477261819718) {
					callback(null, 'Success')
				}
				else {
					callback(new Error('Unknown Season'));
				}
		});
		AWSMock.mock('DynamoDB.DocumentClient', 'put', function(params, callback) {
				callback();
		});
	});

	beforeEach(function() {
		context = { };
		gameCorrect = {
		    "homeTeam" : 1477261819718,
		    "visitorTeam" : 1477261819718,
		    "events" : [
					{
						"description" : "An Event Occured",
				 	},
					{
						"description" : "Another Event Occured",
				 	}
				]
			};
		gameNoHomeTeam = {
		    "visitorTeam" : 1477261819718,
		    "events" : [
					{
						"description" : "An Event Occured",
				 	},
					{
						"description" : "Another Event Occured",
				 	}
				]
			};
		gameNoVisitorTeam = {
		    "homeTeam" : 1477261819718,
		    "events" : [
					{
						"description" : "An Event Occured",
				 	},
					{
						"description" : "Another Event Occured",
				 	}
				]
			};
		gameNoEvents = {
		    "homeTeam" : 1477261819718,
		    "visitorTeam" : 1477261819718,
			};

	});

	afterEach(function() {
	});

	it('-- Adds a Game with correct data', sinon.test(function(done) {

		app.handler(gameCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Game');
			done();
		});
	}));

	it('-- Fails when no Home Team is found', sinon.test(function(done) {

		app.handler(gameNoHomeTeam, context, function (err, data) {
			expect(err.message).equal('No Home Team');
			done();
		});
	}));	

	it('-- Fails when no Visitor Team is found', sinon.test(function(done) {

		app.handler(gameNoVisitorTeam, context, function (err, data) {
			expect(err.message).equal('No Visitor Team');
			done();
		});
	}));

	it('-- Fails when no Events are found', sinon.test(function(done) {

		app.handler(gameNoEvents, context, function (err, data) {
			expect(err.message).equal('No Events');
			done();
		});
	}));
});


