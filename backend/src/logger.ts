import winston from 'winston';
import { format } from 'winston';

const timestampFormat = 'YYYY-MMM-DD HH:mm:ss';

export const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({ format: timestampFormat }),
    format.json(),
    format.printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        message,
        data,
      };
      return JSON.stringify(response);
    })
  ),
  transports: [new winston.transports.Console()],
});
