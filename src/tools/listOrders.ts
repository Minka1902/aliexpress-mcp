import { z } from 'zod';
import { dateTime, fields, localeSite, pagination } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  start_time: dateTime.describe('Range start, YYYY-MM-DD HH:mm:ss'),
  end_time: dateTime.describe('Range end, YYYY-MM-DD HH:mm:ss'),
  status: z.string().describe('Order status, e.g. "Payment Completed", "Buyer Confirmed Receipt"'),
  time_type: z.string().optional().describe('Which time the range applies to, e.g. "Payment Completed Time", "Buyer Confirmed Receipt Time", "Completed Settlement Time"'),
  locale_site: localeSite,
  ...fields,
  ...pagination,
};

const listOrders: ToolDefinition = {
  name: 'aliexpress_list_orders',
  title: 'List orders',
  description: 'List affiliate orders in a time range filtered by status.',
  method: 'aliexpress.affiliate.order.list',
  inputSchema,
};

export { listOrders };
