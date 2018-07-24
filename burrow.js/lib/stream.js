'use strict'

function Events (events) {
  this.client = events
}

module.exports = function (events) {
  return new Events(events)
}

Events.prototype.listen = function (Query, options, callback) {
  // TODO Construct blockrange from options
  var BlockRange = {
    Start: {
      Type: 3,
      Index: 0
    },
    End: {
      Type: 4,
      Index: 0
    }
  }

  return this.client.GetEvents({BlockRange, Query}, function (err, data) {
    if (err) {
      return callback(err)
    }
    for (var i = 0; i < data.Events.length; i++) {
      callback(null, data.Events[i])
    };
  })
}

Events.prototype.subContractEvents = function (address, signature, options, callback) {
  var filter = "EventType = 'LogEvent' AND Address = '" + address.toUpperCase() + "'" + " AND Log0 = '" + signature.toUpperCase() + "'"
  return this.listen(filter, {}, callback)
}