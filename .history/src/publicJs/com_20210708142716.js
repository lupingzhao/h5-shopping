import router from '../router'

export default {
    // 跳转路由
    go(val, key, value) {
        // key 是一个变量 传递的参数名  value参数值
        if (key) {
            router.push({
                path: val,
                query: {
                    [key]: value
                }
            })
        } else {
            router.push(val)
        }

    },
    // 查看详情
    //  查看详情
    goodOne(val) {
        // //  传递参数
        this.$router.push({
            path: "/Details",
            query: {
                id: val,
            },
        });
    },

}