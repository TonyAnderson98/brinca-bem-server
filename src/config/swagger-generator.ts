import swaggerAutogen from 'swagger-autogen';

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/app.ts'];

const doc = {
    info: {
        title: 'Brinca Bem API',
        description: 'API para doação de brinquedos',
        version: '1.0.0',
    },
    host: 'localhost:3333',
    schemes: ['http'],
    // Configuração de Segurança (Cadeadinho)
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    // Modelos de dados
    definitions: {
        Login: {
            $email: "user@example.com",
            $password: "123"
        },
        AddToy: {
            $title: "Boneco do Batman",
            $description: "Usado, mas em bom estado",
            $category: "Bonecos",
            $condition: "used",
            $image_url: "http://img.com/foto.jpg"
        }
    }
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    console.log('✅ Swagger JSON generated successfully!');
});