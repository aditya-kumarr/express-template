declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      // from .env
      NODE_ENV: "dev" | "staging" | "prod";
      DATABASE_URL: string;
      DATABASE_AUTH_TOKEN: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      OAUTH_STATE_TOKEN_SECRET: string;
      SUPPORT_MAIL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URI: string;
      INSTAGRAM_CLIENT_SECRET: string;
      INSTAGRAM_CLIENT_ID: string;
      INSTAGRAM_REDIRECT_URI: string;
      X_CLIENT_ID: string;
      X_CLIENT_SECRET: string;
      X_REDIRECT_URI: string;
      CLIENT_URL: string;
      SERVER_URL: string;
      REDIS_URI: string;
      REDIS_PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      FIREBASE_PROJECT_ID: string;
      YOUTUBE_API_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      STRIPE_SECRET_KEY: string;
    }
  }

  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

export {};
