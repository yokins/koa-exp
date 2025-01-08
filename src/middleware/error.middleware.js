const logger = require('../utils/logger');

const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        logger.error('请求处理出错:', err);
        
        ctx.status = err.status || 500;
        ctx.body = {
            success: false,
            message: err.message || '服务器内部错误',
            error: process.env.NODE_ENV === 'development' ? err.stack : undefined
        };
        ctx.app.emit('error', err, ctx);
    }
};

module.exports = errorHandler;
