# aliexpress-mcp

MCP server (stdio) for the [AliExpress Affiliate API](https://openservice.aliexpress.com/). It lets an MCP client such as Claude search products, generate affiliate links, browse promotions and track orders.

## Setup

```bash
npm install
npm run build
```

### Environment

| Variable | Required | Default | Description |
|---|---|---|---|
| `ALIEXPRESS_APP_KEY` | yes | | App key from the AliExpress Open Platform |
| `ALIEXPRESS_APP_SECRET` | yes | | App secret |
| `ALIEXPRESS_TRACKING_ID` | no | `default` | Default `tracking_id` |
| `ALIEXPRESS_TARGET_CURRENCY` | no | | Default `target_currency` (e.g. `USD`) |
| `ALIEXPRESS_TARGET_LANGUAGE` | no | | Default `target_language` (e.g. `EN`) |
| `ALIEXPRESS_COUNTRY` | no | | Default `country` / `ship_to_country` (e.g. `US`) |
| `ALIEXPRESS_API_URL` | no | `https://api-sg.aliexpress.com/sync` | API gateway |

Defaults only apply to tools that accept that parameter, and any value passed in a tool call overrides them.

### Claude Desktop / Claude Code

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

Claude Code CLI:

```bash
claude mcp add aliexpress -e ALIEXPRESS_APP_KEY=... -e ALIEXPRESS_APP_SECRET=... -- node /absolute/path/to/aliexpress-mcp/dist/index.js
```

## Tools

| Tool | API method |
|---|---|
| `aliexpress_generate_link` | `aliexpress.affiliate.link.generate` |
| `aliexpress_get_categories` | `aliexpress.affiliate.category.get` |
| `aliexpress_get_featured_promos` | `aliexpress.affiliate.featuredpromo.get` |
| `aliexpress_get_featured_promo_products` | `aliexpress.affiliate.featuredpromo.products.get` |
| `aliexpress_download_hot_products` | `aliexpress.affiliate.hotproduct.download` |
| `aliexpress_query_hot_products` | `aliexpress.affiliate.hotproduct.query` |
| `aliexpress_query_products` | `aliexpress.affiliate.product.query` |
| `aliexpress_get_product_sku_details` | `aliexpress.affiliate.product.sku.detail.get` |
| `aliexpress_smart_match_products` | `aliexpress.affiliate.product.smartmatch` |
| `aliexpress_get_orders` | `aliexpress.affiliate.order.get` |
| `aliexpress_list_orders` | `aliexpress.affiliate.order.list` |

List parameters (`source_values`, `category_ids`, `order_ids`, `sku_ids`, `fields`) are passed as arrays. Tools return the API's `result` object as JSON; API errors are returned as tool errors.

## Adding a tool

Create a file in `src/tools/` exporting a `ToolDefinition` (`name`, `title`, `description`, `method`, `inputSchema`), reuse fragments from `src/schemas.ts`, and add it to `src/tools/index.ts`. Signing, request and response handling are shared in `src/client.ts`.

## Testing

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```
