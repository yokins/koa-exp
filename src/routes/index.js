const Router = require('koa-router');
const AuthController = require('../controllers/auth.controller');
const groupController = require('../controllers/group.controller');

const router = new Router({
    prefix: '/api'
});


router.post('/login', AuthController.login);

// 获取所有集团
router.get('/groups', groupController.getAllGroups);
// 创建新的集团
router.post('/groups', groupController.createGroup);
// 获取特定集团
router.get('/groups/:id', groupController.getGroupById);
// 更新特定集团
router.put('/groups/:id', groupController.updateGroup);
// 删除特定集团
router.delete('/groups/:id', groupController.deleteGroup);

module.exports = router;