import pino from 'pino-http';

const isProduction = process.env.NODE_ENV === 'production';

export const logger = pino(
  isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
        },
      },
);
