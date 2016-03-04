var TelegramBot = require('node-telegram-bot-api');
var EchoMiddleware = require('./middlewares/echo-middleware');
var GiftListMiddleware = require('./middlewares/giftlist-middleware');
var GiftInMemoryRepository = require('./repositories/gift-inmemory-repo');
var config = require('../config');

var TelegramBotInstance = new TelegramBot(config.token, {
    polling: true
});

// Register middlewares here
var middlewares = [
    new GiftListMiddleware(TelegramBotInstance),
    new EchoMiddleware(TelegramBotInstance)
];

// https://blog.risingstack.com/how-to-become-a-better-node-js-developer-in-2016/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
var middlewareHandle = function(Message) {
    return new Promise(function (resolve, reject) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        middlewares.some(function(middleware) {
            if (middleware.handle(Message)) {
                resolve();

                return true;
            }
        });

        resolve();
    });
};

TelegramBotInstance.on('message', function (Message) {
    middlewareHandle(Message);
});

var GiftRepository = new GiftInMemoryRepository();

// Temporary initialization
// TODO: Database storage
require('../database/seeds/gifts.json').forEach(function(gift) {
    GiftRepository.add(gift);
});

GiftRepository.getAll()
    .then(function(data) {
       console.log(data);
    });

module.exports = {};