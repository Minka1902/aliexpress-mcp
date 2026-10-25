import type { ToolDefinition } from '../types.js';

const getCategories: ToolDefinition = {
  name: 'aliexpress_get_categories',
  title: 'Get categories',
  description: 'Get all AliExpress affiliate categories (IDs, names and parent IDs). Use the IDs to filter product tools.',
  method: 'aliexpress.affiliate.category.get',
  inputSchema: {},
};

export { getCategories };
