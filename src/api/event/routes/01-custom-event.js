"use strict";
 
/**
 * custom router.
 */
 
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events/me",
      handler: "event.me",
      config: {},
    },
    {
      method: "DELETE",
      path: "/events",
      handler: "event.delete",
      config: {
        middlewares: ["api::event.is-owner"],
      },
    },
    {
      method: "PUT",
      path: "/events",
      handler: "event.update",
      config: {
        middlewares: ["api::event.is-owner"],
      },
    },
  ],
};