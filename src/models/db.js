const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');
const config = require('../config');

const sequelize = new Sequelize(
    config.DATABASE.database,
    config.DATABASE.username,
    config.DATABASE.password,
    {
        host: config.DATABASE.host,
        port: config.DATABASE.port,
        dialect: config.DATABASE.dialect,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        // logging: (msg) => logger.debug(`[SQL] ${msg}`),  // 添加 SQL 日志
        logging: false,
        logQueryParameters: true,  // 记录查询参数
        benchmark: true,  // 记录查询时间
    }
);

// 测试数据库连接
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        logger.info('数据库连接成功');
    } catch (error) {
        logger.error('无法连接到数据库:', error);
        throw error;
    }
};

// 在请求处理中动态启用 SQL 日志
const dynamicLoggingMiddleware = async (ctx, next) => {
    sequelize.options.logging = (msg) => logger.debug(`[SQL] ${msg}`);
    await next();
    sequelize.options.logging = false;  // 处理完请求后关闭 SQL 日志
};

module.exports = {
    sequelize,
    testConnection,
    dynamicLoggingMiddleware
};
