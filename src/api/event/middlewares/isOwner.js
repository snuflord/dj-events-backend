"use strict";

/**
 * `isOwner` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const user = ctx.state.user;
    const entryId = ctx.params.id ? ctx.params.id : undefined;
    let entry = {};
    

    /** 
     * Gets all information about a given entry,
     * populating every relations to ensure 
     * the response includes author-related information
     */
    if (entryId) {
      entry = await strapi.entityService.findOne(
        
        "api::event.event",
        entryId,
        { populate: "*" }
      );
    }

    /**
     * Compares user id and entry author id
     * to decide whether the request can be fulfilled
     * by going forward in the Strapi backend server
     */
    if (user.id !== entry.user.id) {
      return ctx.unauthorized("This action is unauthorized - you are not the owner of this event.");
    } else {
      return next();
    }
  };
};