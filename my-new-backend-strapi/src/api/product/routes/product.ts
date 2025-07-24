/**
 * product router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::product.product');
// src/api/product/routes/product.ts
export default {
    routes: [
      {
        method: 'GET',
        path: '/products',
        handler: 'api::product.product.find',
        config: {
          auth: {},
        },
      },
      {
        method: 'GET',
        path: '/products/:id',
        handler: 'api::product.product.findOne',
        config: {
          auth: {},
        },
      },
      {
        method: 'POST',
        path: '/products',
        handler: 'api::product.product.create',
        config: {
          auth: {},
        },
      },
      {
        method: 'PUT',
        path: '/products/:id',
        handler: 'api::product.product.update',
        config: {
          auth: {},
        },
      },
      {
        method: 'DELETE',
        path: '/products/:id',
        handler: 'api::product.product.delete',
        config: {
          auth: {},
        },
      },
    ],
  };

  