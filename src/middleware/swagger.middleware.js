const {koaSwagger} = require("koa2-swagger-ui");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0", // 使用 OpenAPI 3.0 规范
        info: {
            title: "Koa API",
            version: "1.0.0",
            description: "Koa API 文档示例"
        }
    },
    apis: ["./routes/*.js"] // 指定路由文件路径，用于自动生成文档
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerMiddleware = koaSwagger({
    swaggerOptions: {
        spec: swaggerSpec
    }
});

module.exports = swaggerMiddleware;
