import type { ZodRawShape } from 'zod';

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  method: string;
  inputSchema: ZodRawShape;
};

export type { ToolDefinition };
