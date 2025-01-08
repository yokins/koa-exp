const winston = require('winston');
const path = require('path');

// 定义日志级别
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// 定义日志颜色
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'cyan',  // 改为青色，更容易区分
};

// 添加颜色配置
winston.addColors(colors);

// 自定义格式化函数
const formatMessage = (info) => {
    const { timestamp, level, message, ...rest } = info;
    
    // 如果 message 是对象，进行格式化
    let formattedMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

    // 如果有额外的属性，添加到输出中
    if (Object.keys(rest).length > 0) {
        formattedMessage += '\n' + JSON.stringify(rest, null, 2);
    }
    
    return `${timestamp} ${level}: ${formattedMessage}`;
};

// 自定义日志格式
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),  // 添加毫秒精度
    winston.format.colorize({ all: true }),
    winston.format.printf(formatMessage)
);

// 创建 logger 实例
const logger = winston.createLogger({
    levels,
    format,
    transports: [
        // 控制台输出
        new winston.transports.Console({
            level: 'debug',  // 设置为 debug 级别以显示所有日志
        }),
        // 记录所有日志到文件
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/all.log'),
            level: 'debug',
        }),
        // 单独记录错误日志
        new winston.transports.File({
            filename: path.join(__dirname, '../../logs/error.log'),
            level: 'error',
        }),
    ],
});

module.exports = logger;