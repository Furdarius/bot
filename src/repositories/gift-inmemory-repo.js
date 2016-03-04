var data = {};

module.exports = GiftInMemoryRepository;

function GiftInMemoryRepository() {};

GiftInMemoryRepository.prototype = {
    constructor: GiftInMemoryRepository,

    add: function(item) {
        return new Promise(function (resolve, reject) {
            data[item.id] = item;

            resolve();
        });
    },

    getById: function() {
        return new Promise(function (resolve, reject) {
            var result = data[item.id];

            resolve(result);
        });
    },

    getAll: function() {
        return new Promise(function (resolve, reject) {
            var result = data;

            resolve(result);
        });
    },

    getRandom: function() {
        // Temporary realization
        // TODO: Get random Gifts
        return this.getAll();
    }
};