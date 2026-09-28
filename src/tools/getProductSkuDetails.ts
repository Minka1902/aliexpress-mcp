import { z } from 'zod';
import { id, locale, shipToCountry } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  product_id: id.describe('Product ID'),
  sku_ids: z.array(id).optional().describe('SKU IDs to return. Omit for all SKUs'),
  need_deliver_info: z.enum(['Yes', 'No']).optional().describe('Include delivery info'),
  ...locale,
  ...shipToCountry,
};

const getProductSkuDetails: ToolDefinition = {
  name: 'aliexpress_get_product_sku_details',
  title: 'Get product SKU details',
  description: 'Get SKU-level details (variants, prices, stock, optional delivery info) of an AliExpress product. ship_to_country is required by the API.',
  method: 'aliexpress.affiliate.product.sku.detail.get',
  inputSchema,
};

export { getProductSkuDetails };
