import { productQuery, productQueryValidate } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const queryHotProducts: ToolDefinition = {
  name: 'aliexpress_query_hot_products',
  title: 'Search hot products',
  description: 'Search hot (high commission) AliExpress products by keywords, categories, price and more, with affiliate links.',
  method: 'aliexpress.affiliate.hotproduct.query',
  inputSchema: productQuery,
  validate: productQueryValidate,
};

export { queryHotProducts };
