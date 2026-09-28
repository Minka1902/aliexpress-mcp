import { createHmac } from 'node:crypto';
import { config } from './config.js';

const SYSTEM_PARAMS = {
  app_key: config.appKey,
  sign_method: 'sha256',
  format: 'json',
  v: '2.0',
  simplify: 'false',
};

const HEADERS = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' };

const serialize = (params: Record<string, unknown>) => {
  const out: Record<string, string> = {};
  for (const key in params) {
    const value = params[key];
    if (value === undefined || value === null) continue;
    out[key] = Array.isArray(value) ? value.join(',') : String(value);
  }
  return out;
};

const sign = (params: Record<string, string>) => {
  const hmac = createHmac('sha256', config.appSecret);
  for (const key of Object.keys(params).sort()) hmac.update(key + params[key]);
  return hmac.digest('hex').toUpperCase();
};

const callApi = async (method: string, params: Record<string, unknown>) => {
  const body: Record<string, string> = { ...serialize(params), ...SYSTEM_PARAMS, method, timestamp: Date.now().toString() };
  body.sign = sign(body);

  const response = await fetch(config.apiUrl, { method: 'POST', headers: HEADERS, body: new URLSearchParams(body) });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);

  const data = await response.json();
  const { error_response: error } = data;
  if (error) throw new Error(`${error.code}: ${error.sub_msg || error.msg}`);

  const payload = data[`${method.replaceAll('.', '_')}_response`];
  if (!payload) throw new Error(`Unexpected response: ${JSON.stringify(data)}`);

  const { resp_result: result } = payload;
  if (!result) return payload;
  if (Number(result.resp_code) !== 200) throw new Error(`${result.resp_code}: ${result.resp_msg}`);
  return result.result;
};

export { callApi };
