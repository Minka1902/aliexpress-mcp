# aliexpress-mcp

An [MCP](https://modelcontextprotocol.io) server for the [AliExpress Affiliate API](https://openservice.aliexpress.com/). It lets an MCP client such as Claude Desktop or Claude Code search products, generate affiliate links, browse promotions and track affiliate orders.

The server uses the **stdio** transport: your MCP client launches it as a child process and talks to it over stdin/stdout. You don't run it as a long‑lived service.

## Requirements

- Node.js **20.12 or newer** (`node -v`)
- An AliExpress Open Platform app with Affiliate API access: **App Key**, **App Secret**, and optionally a **Tracking ID**

## Install

### Option A: clone (recommended for development)

```bash
git clone https://github.com/Minka1902/aliexpress-mcp.git
cd aliexpress-mcp
npm install
```

`npm install` also builds the server (via the `prepare` script) into `dist/`. To rebuild after changing the source, run `npm run build`.

### Option B: run straight from GitHub with npx

No clone needed. npx downloads, builds and runs the server on demand:

```bash
npx -y github:Minka1902/aliexpress-mcp
```

With this option, pass credentials through your client's `env` block (see below); a `.env` file is not picked up.

## Configure

| Variable | Required | Default | Description |
|---|---|---|---|
| `ALIEXPRESS_APP_KEY` | yes | | App key from the AliExpress Open Platform |
| `ALIEXPRESS_APP_SECRET` | yes | | App secret |
| `ALIEXPRESS_TRACKING_ID` | no | `default` | Default `tracking_id` for affiliate links. If unset, the server logs a warning to stderr, because links made with `default` may not be credited to you |
| `ALIEXPRESS_TARGET_CURRENCY` | no | | Default `target_currency` (e.g. `USD`) |
| `ALIEXPRESS_TARGET_LANGUAGE` | no | | Default `target_language` (e.g. `EN`) |
| `ALIEXPRESS_COUNTRY` | no | | Default `country` / `ship_to_country` (e.g. `US`) |
| `ALIEXPRESS_API_URL` | no | `https://api-sg.aliexpress.com/sync` | API gateway |

Defaults only apply to tools that accept that parameter, and any value passed in a tool call overrides them. Blank values (`ALIEXPRESS_COUNTRY=`) count as unset.

There are two ways to provide these:

1. **`.env` file (Option A only).** Copy the example and fill it in:

   ```bash
   cp .env.example .env
   ```

   The server reads `.env` from the project root regardless of the directory the client launches it from.

2. **The client's `env` block** (shown in the next section). Values set there take precedence over `.env`.

## Start

Because it's a stdio server, "starting" means registering it with your MCP client. The client starts the process when it needs it.

### Claude Desktop

Open the config file (Claude Desktop → Settings → Developer → Edit Config):

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Add the server under `mcpServers`.

Cloned install (Option A):

```json
{
  "mcpServers": {
    "aliexpress": {
      "command": "node",
      "args": ["/absolute/path/to/aliexpress-mcp/dist/index.js"],
      "env": {
        "ALIEXPRESS_APP_KEY": "your_app_key",
        "ALIEXPRESS_APP_SECRET": "your_app_secret",
        "ALIEXPRESS_TRACKING_ID": "your_tracking_id"
      }
    }
  }
}
```

If you filled in `.env`, you can omit the `env` block. On Windows, write the path with forward slashes (`C:/Users/you/aliexpress-mcp/dist/index.js`) or escaped backslashes.

npx install (Option B):

```json
{
  "mcpServers": {
    "aliexpress": {
      "command": "npx",
      "args": ["-y", "github:Minka1902/aliexpress-mcp"],
      "env": {
        "ALIEXPRESS_APP_KEY": "your_app_key",
        "ALIEXPRESS_APP_SECRET": "your_app_secret",
        "ALIEXPRESS_TRACKING_ID": "your_tracking_id"
      }
    }
  }
}
```

Fully quit and reopen Claude Desktop. The AliExpress tools appear in the tools menu of a new chat.

### Claude Code

```bash
claude mcp add aliexpress \
  --env ALIEXPRESS_APP_KEY=your_app_key \
  --env ALIEXPRESS_APP_SECRET=your_app_secret \
  --env ALIEXPRESS_TRACKING_ID=your_tracking_id \
  -- node /absolute/path/to/aliexpress-mcp/dist/index.js
```

Add `--scope user` to make it available in every project instead of only the current one. Check it's connected with `claude mcp list`, or `/mcp` inside a session.

### Run it manually

Useful for checking that credentials load and the process starts:

```bash
npm start
```

The process then waits silently for JSON-RPC messages on stdin; that's expected. To actually call tools by hand, use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Stop

The server's lifetime is tied to the client that launched it, and it exits on its own when the client closes its stdin.

- **Claude Desktop:** quit the app to stop it. To keep it from starting again, remove the `aliexpress` entry from `claude_desktop_config.json` and restart Claude Desktop.
- **Claude Code:** it stops when the session ends. To disable it, toggle it off in `/mcp`, or remove it with `claude mcp remove aliexpress`.
- **Manual run / Inspector:** press `Ctrl+C`.
- **Stray process** (e.g. after a client crash):

  ```bash
  # macOS / Linux
  pkill -f "aliexpress-mcp/dist/index.js"
  ```

  On Windows, end the matching `node.exe` process in Task Manager.

## Update

Option A:

```bash
git pull
npm install
```

Then restart your client. Option B fetches the latest version from GitHub when the client next starts it; if npx keeps an old copy, clear it with `npm cache clean --force`.

## Uninstall

Remove the client registration (see [Stop](#stop)), then delete the cloned folder.

## Tools

All tools are read-only.

| Status | Tool | API method |
|:---:|---|---|
| ✅ | `aliexpress_generate_link` | `aliexpress.affiliate.link.generate` |
| ✅ | `aliexpress_get_categories` | `aliexpress.affiliate.category.get` |
| ✅ | `aliexpress_get_featured_promos` | `aliexpress.affiliate.featuredpromo.get` |
| ✅ | `aliexpress_get_featured_promo_products` | `aliexpress.affiliate.featuredpromo.products.get` |
| ✅ | `aliexpress_download_hot_products` | `aliexpress.affiliate.hotproduct.download` |
| ✅ | `aliexpress_query_hot_products` | `aliexpress.affiliate.hotproduct.query` |
| ✅ | `aliexpress_query_products` | `aliexpress.affiliate.product.query` |
| ❌ | _not implemented_ | `aliexpress.affiliate.productdetail.get` (product details by ID) |
| ✅ | `aliexpress_get_product_sku_details` | `aliexpress.affiliate.product.sku.detail.get` |
| ✅ | `aliexpress_smart_match_products` | `aliexpress.affiliate.product.smartmatch` |
| ✅ | `aliexpress_get_orders` | `aliexpress.affiliate.order.get` |
| ✅ | `aliexpress_list_orders` | `aliexpress.affiliate.order.list` |

> [!NOTE]
> **Missing:** `aliexpress.affiliate.productdetail.get`, one of the most used affiliate endpoints, has no tool yet. To get a product's details by ID, use `aliexpress_get_product_sku_details` for now.

List parameters (`source_values`, `category_ids`, `order_ids`, `sku_ids`, `fields`) are passed as arrays. Tools return the API's `result` object as JSON; API errors are returned as tool errors.

`aliexpress_get_product_sku_details` requires `ship_to_country` on the API side. When `ALIEXPRESS_COUNTRY` isn't set, the tool's schema marks it as required.

Input rules checked before the API is called:

- `min_sale_price` / `max_sale_price` are integers in the smallest unit of `target_currency` (`3141` = 31.41 USD), and min must not exceed max.
- Date-times use `YYYY-MM-DD HH:mm:ss` and must be real dates (`2025-02-29` is rejected). A range start must not be after its end.
- `delivery_days` is one of `3`, `5`, `7`, `10`.
- `source_values` accepts only `http`/`https` URLs.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| Server fails to start with `Missing required environment variable ALIEXPRESS_APP_KEY` | Credentials aren't reaching the process. Check the client's `env` block, or that `.env` exists in the project root. |
| Tool error `fetch failed: getaddrinfo ENOTFOUND ...` | No network access to the API gateway, or a wrong `ALIEXPRESS_API_URL`. |
| Tool error `The operation was aborted due to timeout` | The API didn't answer within 30 seconds. Retry. |
| Tool error like `IncompleteSignature: ...` or `InvalidApiKey: ...` | Wrong App Key / App Secret, or the app lacks Affiliate API permission. |
| Tool error `Gateway returned non-JSON (HTTP ...)` | The gateway answered with something other than JSON (e.g. an HTML maintenance page). Check `ALIEXPRESS_API_URL`, or retry later. |
| Tools don't show up in Claude Desktop | Invalid JSON in the config, a relative path to `dist/index.js`, or the app wasn't fully restarted. Logs: `~/Library/Logs/Claude/mcp-server-aliexpress.log` (macOS), `%APPDATA%\Claude\logs\` (Windows). |
| `process.loadEnvFile is not a function` | Node is older than 20.12. Upgrade Node. |

## Adding a tool

Create a file in `src/tools/` exporting a `ToolDefinition` (`name`, `title`, `description`, `method`, `inputSchema`, and an optional `validate` for cross-field rules, such as `range(startKey, endKey)` from `src/validators.ts`), reuse fragments from `src/schemas.ts`, and add it to `src/tools/index.ts`. Signing, request and response handling are shared in `src/client.ts`. Run `npm run build` and restart your client.

## License

MIT
