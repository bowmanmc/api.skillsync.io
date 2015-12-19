'use strict';


module.exports = {

    hello: function(request, reply) {
        return reply({
            'api': 'howdy'
        });
    }

};
