import { downloadHotProducts } from './downloadHotProducts.js';
import { generateLink } from './generateLink.js';
import { getCategories } from './getCategories.js';
import { getFeaturedPromoProducts } from './getFeaturedPromoProducts.js';
import { getFeaturedPromos } from './getFeaturedPromos.js';
import { getOrders } from './getOrders.js';
import { getProductSkuDetails } from './getProductSkuDetails.js';
import { listOrders } from './listOrders.js';
import { queryHotProducts } from './queryHotProducts.js';
import { queryProducts } from './queryProducts.js';
import { smartMatchProducts } from './smartMatchProducts.js';
import type { ToolDefinition } from '../types.js';

const tools: ToolDefinition[] = [
  generateLink,
  getCategories,
  getFeaturedPromos,
  getFeaturedPromoProducts,
  downloadHotProducts,
  queryHotProducts,
  queryProducts,
  getProductSkuDetails,
  smartMatchProducts,
  getOrders,
  listOrders,
];

export { tools };
