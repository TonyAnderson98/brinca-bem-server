import 'dotenv/config';

export const env = {
    port: Number(process.env.PORT) || 3333,
    database: {
        url: process.env.DATABASE_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET as string,
        expiresIn: '1d'
    }
};

if (!process.env.DATABASE_URL) {
    throw new Error('❌ DATABASE_URL missing in .env')
}

if (!process.env.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET missing in .env')
}