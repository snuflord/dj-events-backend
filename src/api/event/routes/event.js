
// /**
//  * event router
//  */
  
const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::event.event", {

    
    config: {
        update: {
            middlewares: ["api::event.is-owner"],
        },
        delete: {
            middlewares: ["api::event.is-owner"],
        },
    },
});

'use strict';

// /**
//  * event router.
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::event.event', {
//   config: {
//     update: {
//         "policies" : ["is-owner"]
//     },
//     delete: {
//         "policies" : ["is-owner"]
//     }
//   }
// });