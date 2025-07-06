
interface AppConfig {
  whatsapp: {
    enabled: boolean;
    endpoint: string;
    apiKey: string;
    templateNamespace: string;
  };
  redis: {
    host: string;
    port: number;
  };
}

export const config: AppConfig = {
  whatsapp: {
    enabled: process.env.WHATSAPP_ENABLED === 'true',
    endpoint: process.env.WHATSAPP_ENDPOINT || 'https://graph.facebook.com/v18.0/123456789/messages',
    apiKey: process.env.WHATSAPP_API_KEY || '',
    templateNamespace: process.env.WHATSAPP_TEMPLATE_NS || 'psa_notifications'
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379')
  }
};
