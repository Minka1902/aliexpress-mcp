import { productQuery } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const queryProducts: ToolDefinition = {
  name: 'aliexpress_query_products',
  title: 'Search products',
  description: 'Search AliExpress affiliate products by keywords, categories, price and more, with affiliate links.',
  method: 'aliexpress.affiliate.product.query',
  inputSchema: productQuery,
};

export { queryProducts };
