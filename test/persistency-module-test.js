require('should');
var Persistency = require('../src/persistency-module');
var Options = require('../src/options');

describe('persistencyModule test', () => {
    let options = new Options().options;
    let mockFlights = [{
        "search": {
            "from": "LIS",
            "to": "LON",
            "source": "momondo",
            "queried": "2016-10-22T13:39:35.829Z"
        },
        "flight": {
            "duration": 720,
            "stops": 1,
            "price": {
                "amount": 85,
                "currency": "EUR"
            },
            "departure": {
                "time": {
                    "minute": 0,
                    "hour": 23,
                    "day": 24,
                    "month": 10,
                    "year": 2016
                },
                "airport": "LIS"
            },
            "arrival": {
                "time": {
                    "minute": 0,
                    "hour": 11,
                    "day": 25,
                    "month": 10,
                    "year": 2016
                },
                "airport": "LGW"
            }
        }
    }, {
        "search": {
            "from": "LIS",
            "to": "LON",
            "source": "momondo",
            "queried": "2016-10-22T13:39:35.829Z"
        },
        "flight": {
            "duration": 720,
            "stops": 1,
            "price": {
                "amount": 85,
                "currency": "EUR"
            },
            "departure": {
                "time": {
                    "minute": 0,
                    "hour": 23,
                    "day": 24,
                    "month": 10,
                    "year": 2016
                },
                "airport": "LIS"
            },
            "arrival": {
                "time": {
                    "minute": 0,
                    "hour": 11,
                    "day": 25,
                    "month": 10,
                    "year": 2016
                },
                "airport": "LGW"
            }
        }
    }];

    function checkNumber(myNumber, mustBe) {
        return (myNumber).should.be.exactly(mustBe).which.is.a.Number();
    }

    it('should insert mock documents and remove them using the ids', () => {
        let persistFlightPromise = Persistency.insertFlights(options.database, options.collection, mockFlights);
        let ids;
        let removeFlightPromise = persistFlightPromise.then((idsArray) => {
            ids = idsArray;
            (idsArray.length).should.be.exactly(2);
            return Persistency.removeFlights(options.database, options.collection, idsArray);
        });
        return removeFlightPromise.then((deleted) => {
            return checkNumber(deleted, ids.length);
        });
    });

    it('should retrieve [] if there is no data to insert', () => {
        let persistencyPromise = Persistency.insertFlights(options.database, options.collection, []);
        return persistencyPromise.then((result) => {
            return checkNumber(result.length, 0);
        });
    });

    it('should fake insert/remove and retrieve mock ids if database is set to none', () => {
        let persistencyPromise = Persistency.removeFlights(Persistency.NO_DATABASE, options.collection, []);
        return persistencyPromise.then((result) => {
            checkNumber(result.length, 0);
            let persistencyPromise = Persistency.insertFlights(Persistency.NO_DATABASE, options.collection, []);
            return persistencyPromise.then((result) => {
                checkNumber(result.length, 0);
            });
        });
    });

});