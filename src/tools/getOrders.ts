import { fields, ids } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  order_ids: ids.describe('Order IDs to fetch'),
  ...fields,
};

const getOrders: ToolDefinition = {
  name: 'aliexpress_get_orders',
  title: 'Get orders',
  description: 'Get affiliate order details (status, amounts, commission) by order IDs.',
  method: 'aliexpress.affiliate.order.get',
  inputSchema,
};

export { getOrders };
