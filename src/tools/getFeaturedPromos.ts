import { fields } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const getFeaturedPromos: ToolDefinition = {
  name: 'aliexpress_get_featured_promos',
  title: 'Get featured promotions',
  description: 'Get the current featured AliExpress promotions (names, descriptions, product counts). Use a promotion name with aliexpress_get_featured_promo_products.',
  method: 'aliexpress.affiliate.featuredpromo.get',
  inputSchema: fields,
};

export { getFeaturedPromos };
