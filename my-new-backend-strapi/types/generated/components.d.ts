import type { Schema, Struct } from '@strapi/strapi';

export interface OrdereditemOrderedItem extends Struct.ComponentSchema {
  collectionName: 'components_ordereditem_ordered_items';
  info: {
    displayName: 'Ordered-item';
  };
  attributes: {
    amount: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Decimal;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ordereditem.ordered-item': OrdereditemOrderedItem;
    }
  }
}
