const { env } = process;

try {
  process.loadEnvFile(new URL('../.env', import.meta.url));
} catch (error) {
  if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
}

const required = (name: string) => {
  const value = env[name];
  if (!value) throw new Error(`Missing required environment variable ${name}`);
  return value;
};

if (!env.ALIEXPRESS_TRACKING_ID) console.error('ALIEXPRESS_TRACKING_ID is not set, affiliate links use the "default" tracking ID and may not be attributed to your account');

const config = {
  appKey: required('ALIEXPRESS_APP_KEY'),
  appSecret: required('ALIEXPRESS_APP_SECRET'),
  apiUrl: env.ALIEXPRESS_API_URL || 'https://api-sg.aliexpress.com/sync',
  defaults: {
    tracking_id: env.ALIEXPRESS_TRACKING_ID || 'default',
    target_currency: env.ALIEXPRESS_TARGET_CURRENCY,
    target_language: env.ALIEXPRESS_TARGET_LANGUAGE,
    country: env.ALIEXPRESS_COUNTRY,
    ship_to_country: env.ALIEXPRESS_COUNTRY,
  } as Record<string, string | undefined>,
};

export { config };
