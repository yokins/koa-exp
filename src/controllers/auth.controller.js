const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const config = require('../config');

class AuthController {
    static async login(ctx) {
        const { username, password } = ctx.request.body;

        try {
            const user = await UserModel.findByCredentials(username, password);

            if (user) {
                const token = jwt.sign(
                    { id: user.id, username: user.username },
                    config.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data: {
                        token,
                        user: {
                            id: user.id,
                            username: user.username
                        }
                    }
                };
            } else {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    message: '用户名或密码错误'
                };
            }
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                code: 500,
                message: '服务器错误'
            };
        }
    }
}

module.exports = AuthController;
