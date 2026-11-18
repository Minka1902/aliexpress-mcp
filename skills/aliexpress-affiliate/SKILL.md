---
name: aliexpress-affiliate
description: Search AliExpress affiliate products, inspect SKU prices and shipping, find promotions, generate tracked links, and look up affiliate commissions or orders. Use for AliExpress catalog and affiliate reporting requests.
---

# AliExpress Affiliate

Use the connected AliExpress MCP tools when available. Otherwise run the bundled Node.js 20.12+ command from this skill's directory. It calls the same Affiliate API and needs no npm install. The command can list tools and describe their arguments offline.

```text
node scripts/affiliate.mjs list
node scripts/affiliate.mjs describe query_products
node scripts/affiliate.mjs call query_products --file request.json
```

For a call, supply a UTF-8 JSON object through stdin or use `--file`. For example, to find USB-C hubs up to US$25 for delivery to the US, use:

```json
{"keywords":"USB-C hub","max_sale_price":2500,"target_currency":"USD","ship_to_country":"US","sort":"SALE_PRICE_ASC","page_size":5}
```

Live calls need `ALIEXPRESS_APP_KEY` and `ALIEXPRESS_APP_SECRET` from an AliExpress Open Platform app with Affiliate API access. Use credentials provided to the process. If missing, ask the user to configure them locally. Node can load a user-specified environment file with `node --env-file="/path/to/.env" scripts/affiliate.mjs ...`. Keep credential values out of messages and request JSON.

## Choose a tool

The MCP names use the prefix `aliexpress_`. The bundled command also accepts the short names below.

| Request | Tool and inputs |
| --- | --- |
| Search the catalog or find high-commission products | Use `query_products` or `query_hot_products`. Use `get_categories` to resolve category names to IDs. Price bounds are integers in the currency's smallest unit. Pass the requested currency explicitly when applying a budget. |
| List a category's hot products | Use `download_hot_products` with a single `category_id`. |
| Check variants, stock, or delivery for a product | Use `get_product_sku_details` with the numeric product ID as a string. Supply `ship_to_country` unless a country default exists. Set `need_deliver_info` to `"Yes"` for shipping details. |
| Browse featured promotions | Use `get_featured_promos`, then pass the returned `promotion_name` to `get_featured_promo_products`. |
| Generate affiliate links | Use `generate_link` with an array of HTTP(S) AliExpress URLs in `source_values`. Link type `"0"` is standard and `"2"` is for hot products. For account attribution use the user's `tracking_id` or configured `ALIEXPRESS_TRACKING_ID`. The fallback `default` may leave links uncredited. |
| Get device-specific recommendations | Use `smart_match_products` when the user supplies an ad ID or IDFA as `device_id`. For keyword-only discovery use `query_products`. |
| Inspect affiliate orders and commissions | Use `get_orders` with an array of string `order_ids`. For a report use `list_orders` with `start_time`, `end_time`, and `status`. Set `time_type` when the request distinguishes payment, receipt, or settlement. |

Use numeric strings for IDs, JSON arrays for list inputs, and `YYYY-MM-DD HH:mm:ss` for order and promotion times. The supported locale defaults are `ALIEXPRESS_COUNTRY`, `ALIEXPRESS_TARGET_CURRENCY`, and `ALIEXPRESS_TARGET_LANGUAGE`. An explicit argument overrides the applicable default. Paginated tools start at page 1 and accept up to 50 results per page where `page_size` is available. For totals across an interval, include all matching pages and distinguish order value from commission.

Use prices, variants, shipping details, currencies, and URLs returned by the API. Keep the selected destination and currency visible when comparing offers. Label generated promotion links as affiliate links. If a call fails, report the error separately from a successful search with no matches.

Based on [Minka1902/aliexpress-mcp at da5735c](https://github.com/Minka1902/aliexpress-mcp/tree/da5735c5c9053ff30ad4a4999e63f662c7b7be78).
