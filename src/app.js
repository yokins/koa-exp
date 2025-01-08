const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const config = require('./config');
const errorHandler = require('./middleware/error.middleware');
const loggerMiddleware = require('./middleware/logger.middleware');
const { testConnection, dynamicLoggingMiddleware } = require('./models/db');
const Router = require('./routes/index');
const UserModel = require('./models/user');
const swaggerMiddleware = require('./middleware/swagger.middleware');

const app = new Koa();

// 使用中间件
app.use(loggerMiddleware);  
app.use(dynamicLoggingMiddleware);  
app.use(bodyParser());
app.use(cors());
app.use(errorHandler);
app.use(swaggerMiddleware);

// 注册路由
// Router.get('/api-docs', swaggerMiddleware);
app.use(Router.routes()).use(Router.allowedMethods());



// 错误处理
app.on('error', (err, ctx) => {
    console.error('服务器错误', err);
});

// 初始化数据库并启动服务器
async function bootstrap() {
    try {
        // 测试数据库连接
        await testConnection();
        
        // 同步用户模型
        await UserModel.sync();

        // 启动服务器
        const server = app.listen(config.PORT, () => {
            console.log(`服务器已启动，访问地址: http://localhost:${config.PORT}`);
        });

        // 添加错误处理
        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`端口 ${config.PORT} 已被占用，请尝试以下解决方案：`);
                console.error('1. 使用其他端口');
                console.error(`2. 终止占用端口 ${config.PORT} 的进程：执行 lsof -i :${config.PORT} && kill -9 PID`);
                process.exit(1);
            } else {
                console.error('服务器错误:', error);
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('服务器启动失败:', error);
        process.exit(1);
    }
}

bootstrap();
