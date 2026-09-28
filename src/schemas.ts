import { z } from 'zod';

const id = z.string().regex(/^\d+$/, 'Must be a numeric ID string');

const ids = z.array(id).min(1);

const dateTime = z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, 'Format: YYYY-MM-DD HH:mm:ss');

const localeSite = z.enum(['global', 'ru_site', 'es_site', 'it_site']).optional().describe('Site the data belongs to');

const fields = {
  fields: z.array(z.string()).optional().describe('Response fields to return, e.g. ["commission_rate","sale_price"]. Omit for all fields'),
};

const trackingId = {
  tracking_id: z.string().optional().describe('Affiliate tracking ID. Defaults to ALIEXPRESS_TRACKING_ID'),
};

const locale = {
  target_currency: z.string().optional().describe('Currency code, e.g. USD, EUR, ILS. Defaults to ALIEXPRESS_TARGET_CURRENCY'),
  target_language: z.string().optional().describe('Language code, e.g. EN, FR, HE. Defaults to ALIEXPRESS_TARGET_LANGUAGE'),
};

const pagination = {
  page_no: z.number().int().min(1).optional().describe('Page number, starts at 1'),
  page_size: z.number().int().min(1).max(50).optional().describe('Results per page, 1-50'),
};

const country = {
  country: z.string().optional().describe('Country code (e.g. US) to filter products available there. Defaults to ALIEXPRESS_COUNTRY'),
};

const shipToCountry = {
  ship_to_country: z.string().optional().describe('Destination country code (e.g. US) for prices and availability. Defaults to ALIEXPRESS_COUNTRY'),
};

const productQuery = {
  keywords: z.string().optional().describe('Search keywords'),
  category_ids: z.array(id).optional().describe('Category IDs to filter by'),
  min_sale_price: z.number().nonnegative().optional().describe('Minimum sale price filter'),
  max_sale_price: z.number().nonnegative().optional().describe('Maximum sale price filter'),
  platform_product_type: z.enum(['ALL', 'PLAZA', 'TMALL']).optional().describe('Product platform type'),
  sort: z.enum(['SALE_PRICE_ASC', 'SALE_PRICE_DESC', 'LAST_VOLUME_ASC', 'LAST_VOLUME_DESC']).optional().describe('Sort order'),
  delivery_days: z.number().int().positive().optional().describe('Max estimated delivery days (3, 5, 7 or 10)'),
  promotion_name: z.string().optional().describe('Restrict to a promotion, e.g. "Business Top Sellers with Exclusive Price"'),
  ...fields,
  ...pagination,
  ...locale,
  ...trackingId,
  ...shipToCountry,
};

export { country, dateTime, fields, id, ids, locale, localeSite, pagination, productQuery, shipToCountry, trackingId };
