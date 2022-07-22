'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('textarea')
      .service('myService')
      .getWelcomeMessage();
  },
};
