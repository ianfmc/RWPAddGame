var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    
    var docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
    var uuid = new Date().getTime();
    
    if (event.homeTeam == null) {
      callback(new Error('No Home Team'));
    }
    else if (event.visitorTeam == null) {
      callback(new Error('No Visitor Team'));
    }
    else if (event.events == null) {
      callback(new Error('No Events'));
    }
    else {

      var params = {

          TableName : 'Game',
          Item : { 
              "gameID" : uuid.toString(),
              "homeTeam": event.homeTeam,
              "visitorTeam": event.visitorTeam,
              "events": event.events
          },
      };
      docClient.put(params, function(err, result) {
        if (err) 
          callback(err);
        else 
          callback(null, 'Game: ' + uuid);
      });
    }
};