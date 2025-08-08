const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RythuBowl API",
      version: "1.0.0",
      description: "Backend API documentation for RythuBowl",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js", "./swagger/swaggerDef.js"], // Your API comments location
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
