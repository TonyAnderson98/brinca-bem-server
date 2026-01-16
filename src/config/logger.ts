import winston from 'winston';

// Níveis de Severidade (Padrão RFC5424)
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Definição de Cores para o terminal (purpurina)
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

// Formato para Desenvolvimento (colorido e bonitinho com muita purpurina)
const devFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
    ),
);

// Formato para Produção (JSON Estruturado)
const prodFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
);

// Lógica de Seleção de Formato
const format = process.env.NODE_ENV === 'development'
    ? devFormat
    : prodFormat;

const logger = winston.createLogger({
    level: 'debug',
    levels,
    format,
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;