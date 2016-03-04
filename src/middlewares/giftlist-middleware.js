var _ = require('lodash');

var regexp = /\/gifts/;

var validate = function(text) {
    return regexp.exec(text);
};

module.exports = GiftListMiddleware;

function GiftListMiddleware(TelegramBotInstance) {
    this.TelegramBotInstance = TelegramBotInstance;
};

GiftListMiddleware.prototype.handle = function(Message) {
    var result = validate(Message.text);

    if (_.isEmpty(result)) {
        return false;
    }

    this.TelegramBotInstance.sendMessage(Message.from.id, '!gifts!');

    return true;
};