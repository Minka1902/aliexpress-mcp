#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { callApi } from './client.js';
import { config } from './config.js';
import { tools } from './tools/index.js';

const ANNOTATIONS = { readOnlyHint: true, openWorldHint: true };

const { version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const server = new McpServer({ name: 'aliexpress-mcp', version });

const toError = (message: string) => ({ content: [{ type: 'text' as const, text: message }], isError: true });

const pickDefaults = (shape: object) =>
  Object.fromEntries(Object.entries(config.defaults).filter(([key, value]) => value && key in shape));

for (const { name, title, description, method, inputSchema, validate } of tools) {
  const defaults = pickDefaults(inputSchema);
  server.registerTool(name, { title, description, inputSchema, annotations: ANNOTATIONS }, async (args) => {
    const params = { ...defaults, ...args };
    const invalid = validate?.(params);
    if (invalid) return toError(invalid);
    try {
      const result = await callApi(method, params);
      return { content: [{ type: 'text', text: JSON.stringify(result ?? null) }] };
    } catch (error) {
      return toError((error as Error).message);
    }
  });
}

await server.connect(new StdioServerTransport());
