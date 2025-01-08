// 模拟的集团数据
let groups = [];

// 控制器
class GroupController {
    // 获取所有集团
    async getAllGroups(ctx) {
        ctx.body = groups;
    }

    // 创建新的集团
    async createGroup(ctx) {
        const newGroup = ctx.request.body;
        groups.push(newGroup);
        ctx.status = 201;
        ctx.body = newGroup;
    }

    // 获取特定集团
    async getGroupById(ctx) {
        const group = groups.find(g => g.id === ctx.params.id);
        if (group) {
            ctx.body = group;
        } else {
            ctx.status = 404;
        }
    }

    // 更新特定集团
    async updateGroup(ctx) {
        const index = groups.findIndex(g => g.id === ctx.params.id);
        if (index !== -1) {
            groups[index] = ctx.request.body;
            ctx.body = groups[index];
        } else {
            ctx.status = 404;
        }
    }

    // 删除特定集团
    async deleteGroup(ctx) {
        const index = groups.findIndex(g => g.id === ctx.params.id);
        if (index !== -1) {
            groups.splice(index, 1);
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }
    }
}

module.exports = new GroupController();
