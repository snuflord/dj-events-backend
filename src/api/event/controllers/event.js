// 'use strict';

// /**
//  * event controller
//  */



"use strict";
 
/**
 *  event controller
 */
 
const { createCoreController, parseMultipartData } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  
  // Create an event
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.entityService.create("api::event.event", {
        data: {
          data,
          files,
        },
      });
    } else {
      ctx.request.body.data.user = ctx.state.user.id;
      ctx.request.body.data.publishedAt = new Date();
      entity = await strapi.entityService.create(
        "api::event.event",
        ctx.request.body
      );
    }
    return entity;
  },

  // // Update event
  // async update(ctx) {
  //   let entity;

  //   const { id } = ctx.params;

  //   if (ctx.is("multipart")) {
  //     const { data, files } = parseMultipartData(ctx);
  //     data.user = ctx.state.user.id;
  //     entity = await strapi.entityService.update("api::event.event", id, {
  //       data: {
  //         data,
  //         files,
  //       },
  //     });
  //   } else {
  //     ctx.request.body.data.user = ctx.state.user.id;
      
  //     entity = await strapi.entityService.update("api::event.event", id,
  //       ctx.request.body
  //     );
  //   }
  //   return entity;
  // },

  // Update user event
  async update(ctx) {
    
    const { id } = ctx.params;

    let entity;

    const user = await strapi.entityService.findOne("api::event.event", id, {
      populate: { user: true },
    });

    if (user.user.id === ctx.state.user.id) {

      // ctx.request.body.data.user = ctx.state.user.id;
      // ctx.request.body.data.publishedAt = new Date();
      let updatedItem = ctx.request.body
      entity = await strapi.entityService.update("api::event.event", id, 
          
        updatedItem
          
      );
      console.log('first')
      return entity;

    } else {

      return ctx.unauthorized(`You can only update events you own`);
    }
  },

 
  // Delete event
  async delete(ctx) {
    const { id } = ctx.params;
 
    const user = await strapi.entityService.findOne("api::event.event", id, {
      populate: { user: true },
    });
 
    if (user.user.id === ctx.state.user.id) {
      const deletedEvent = await strapi.entityService.delete(
        "api::event.event",
        id
      );
      const sanitizedDeletedEvent = await this.sanitizeOutput(deletedEvent);
      return this.transformResponse(sanitizedDeletedEvent);
    } else {
      return ctx.unauthorized(`You can only delete events you own`);
    }
  },
 
  // Get user events
  async me(ctx) {
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }
 
    const events = await strapi.entityService.findMany("api::event.event", {
      filters: { user: user.id },
    });
 
    const sanitizedEvents = await this.sanitizeOutput(events);
 
    return this.transformResponse(sanitizedEvents);
  },
}));
 