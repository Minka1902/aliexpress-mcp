import { z } from 'zod';
import { shipToCountry, trackingId } from '../schemas.js';
import type { ToolDefinition } from '../types.js';

const inputSchema = {
  source_values: z.array(z.url({ protocol: /^https?$/ })).min(1).describe('AliExpress URLs (product, store or promo pages) to convert into affiliate links'),
  promotion_link_type: z.enum(['0', '2']).default('0').describe('0 = normal link (standard commission), 2 = hot link (hot product commission)'),
  ...trackingId,
  ...shipToCountry,
};

const generateLink: ToolDefinition = {
  name: 'aliexpress_generate_link',
  title: 'Generate affiliate links',
  description: 'Convert AliExpress URLs into trackable affiliate promotion links.',
  method: 'aliexpress.affiliate.link.generate',
  inputSchema,
};

export { generateLink };
