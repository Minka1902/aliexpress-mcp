#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { callApi } from './client.js';
import { config } from './config.js';
import { tools } from './tools/index.js';

const ANNOTATIONS = { readOnlyHint: true, openWorldHint: true };

const server = new McpServer({ name: 'aliexpress-mcp', version: '1.0.0' });

const pickDefaults = (shape: object) =>
  Object.fromEntries(Object.entries(config.defaults).filter(([key, value]) => value !== undefined && key in shape));

for (const { name, title, description, method, inputSchema } of tools) {
  const defaults = pickDefaults(inputSchema);
  server.registerTool(name, { title, description, inputSchema, annotations: ANNOTATIONS }, async (args) => {
    try {
      const result = await callApi(method, { ...defaults, ...args });
      return { content: [{ type: 'text', text: JSON.stringify(result) }] };
    } catch (error) {
      return { content: [{ type: 'text', text: (error as Error).message }], isError: true };
    }
  });
}

await server.connect(new StdioServerTransport());
