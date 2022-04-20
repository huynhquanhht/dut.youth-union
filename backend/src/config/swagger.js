const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'DutUnion.API HTTP API',
      version: 'v1.0',
      description: '',
      contact: {},
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/api_docs/*.yaml"],
};

module.exports = swaggerOptions;
