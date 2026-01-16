import morgan, { StreamOptions } from 'morgan';
import logger from '../config/logger.js';

// Canal para conectar o Morgan ao Winston
const stream: StreamOptions = {
    write: (message) => logger.http(message.trim()),
};

// Ignora logs de HTTP em ambiente de teste para não sujar o relatório do Vitest
const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'test';
};

// Configuração final
const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);

export default httpLogger;