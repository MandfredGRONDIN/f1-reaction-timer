// /back/config/swaggerOptions.js
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A description of my API',
    },
    servers: [
      {
        url: 'http://localhost:5001', // URL de ton API
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Chemin vers tes fichiers de route
}

const specs = swaggerJsdoc(options)

module.exports = specs
