const logger = require('../utils/logger');

const loggerMiddleware = async (ctx, next) => {
    const start = Date.now();

    // 记录详细的请求信息
    const requestLog = {
        method: ctx.method,
        url: ctx.url,
        query: ctx.query,
        params: ctx.params,
        body: ctx.request.body,
        headers: ctx.headers
    };

    logger.info(`--> ${ctx.method} ${ctx.url}`);
    logger.debug('Request details:', requestLog);

    try {
        await next();

        const ms = Date.now() - start;
        // 记录响应信息
        const responseLog = {
            status: ctx.status,
            body: ctx.body,
            duration: `${ms}ms`
        };

        logger.info(`<-- ${ctx.method} ${ctx.url} ${ctx.status} ${ms}ms`);
        logger.debug('Response details:', responseLog);
    } catch (error) {
        const ms = Date.now() - start;
        logger.error(
            `<-- ${ctx.method} ${ctx.url} ${error.status || 500} ${ms}ms\nError: ${error.message}\nStack: ${error.stack}`
        );
        throw error;
    }
};

module.exports = loggerMiddleware;
