import type { ZodRawShape } from 'zod';

type ToolArgs = Record<string, unknown>;

type ToolDefinition = {
  name: string;
  title: string;
  description: string;
  method: string;
  inputSchema: ZodRawShape;
  validate?: (args: ToolArgs) => string | undefined;
};

export type { ToolArgs, ToolDefinition };
