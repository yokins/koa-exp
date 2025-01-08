// 模拟的集团数据
// let groups = [];

// 控制器
const Group = require('../models/group');

class GroupController {
    // 获取所有集团
    async getAllGroups(ctx) {
        const groups = await Group.findAll();
        ctx.body = groups;
    }

    // 创建新的集团
    async createGroup(ctx) {
        const newGroup = await Group.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newGroup;
    }

    // 获取特定集团
    async getGroupById(ctx) {
        const group = await Group.findByPk(ctx.params.id);
        if (group) {
            ctx.body = group;
        } else {
            ctx.status = 404;
        }
    }

    // 更新特定集团
    async updateGroup(ctx) {
        const [updated] = await Group.update(ctx.request.body, {
            where: { id: ctx.params.id }
        });
        if (updated) {
            const updatedGroup = await Group.findByPk(ctx.params.id);
            ctx.body = updatedGroup;
        } else {
            ctx.status = 404;
        }
    }

    // 删除特定集团
    async deleteGroup(ctx) {
        const deleted = await Group.destroy({
            where: { id: ctx.params.id }
        });
        if (deleted) {
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }
    }
}

module.exports = new GroupController();
