import type { ToolArgs } from './types.js';

const range = (startKey: string, endKey: string) => (args: ToolArgs) => {
  const start = args[startKey] as string | number | undefined;
  const end = args[endKey] as string | number | undefined;
  if (start !== undefined && end !== undefined && start > end) return `${startKey} must not be greater than ${endKey}`;
};

export { range };
