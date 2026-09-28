import { z } from 'zod';
import { country, dateTime, fields, id, locale, pagination, trackingId } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const SORTS = ['commissionAsc', 'commissionDesc', 'priceAsc', 'priceDesc', 'volumeAsc', 'volumeDesc', 'discountAsc', 'discountDesc', 'ratingAsc', 'ratingDesc', 'promotionTimeAsc', 'promotionTimeDesc'] as const;

const inputSchema = {
  promotion_name: z.string().optional().describe('Featured promotion name, from aliexpress_get_featured_promos'),
  category_id: id.optional().describe('Category ID to filter by'),
  promotion_start_time: dateTime.optional().describe('Promotion start time, YYYY-MM-DD HH:mm:ss'),
  promotion_end_time: dateTime.optional().describe('Promotion end time, YYYY-MM-DD HH:mm:ss'),
  sort: z.enum(SORTS).optional().describe('Sort order'),
  ...fields,
  ...pagination,
  ...locale,
  ...trackingId,
  ...country,
};

const getFeaturedPromoProducts: ToolDefinition = {
  name: 'aliexpress_get_featured_promo_products',
  title: 'Get featured promotion products',
  description: 'Get products (with affiliate links) belonging to a featured AliExpress promotion.',
  method: 'aliexpress.affiliate.featuredpromo.products.get',
  inputSchema,
};

export { getFeaturedPromoProducts };
