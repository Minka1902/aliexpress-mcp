import { z } from 'zod';
import { country, fields, id, locale, pagination, trackingId } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  device_id: z.string().describe('Device ID (adid or idfa)'),
  product_id: id.optional().describe('Product ID to find recommendations for'),
  keywords: z.string().optional().describe('Recommendation keywords'),
  site: z.string().optional().describe('Site name'),
  app: z.string().optional().describe('App information'),
  device: z.string().optional().describe('Device information'),
  user: z.string().optional().describe('User information'),
  page_no: pagination.page_no,
  ...fields,
  ...locale,
  ...trackingId,
  ...country,
};

const smartMatchProducts: ToolDefinition = {
  name: 'aliexpress_smart_match_products',
  title: 'Smart match products',
  description: 'Get personalized product recommendations for a device, product or keywords, with affiliate links.',
  method: 'aliexpress.affiliate.product.smartmatch',
  inputSchema,
};

export { smartMatchProducts };
