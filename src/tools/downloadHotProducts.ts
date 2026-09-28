import { country, fields, id, locale, localeSite, pagination, trackingId } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  category_id: id.describe('Category ID to download hot products from'),
  locale_site: localeSite,
  ...fields,
  ...pagination,
  ...locale,
  ...trackingId,
  ...country,
};

const downloadHotProducts: ToolDefinition = {
  name: 'aliexpress_download_hot_products',
  title: 'Download hot products',
  description: 'Download the hot (high commission) product list of a category, with affiliate links.',
  method: 'aliexpress.affiliate.hotproduct.download',
  inputSchema,
};

export { downloadHotProducts };
