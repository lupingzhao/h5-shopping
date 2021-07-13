
// 引入提示
import { Dialog, Toast } from 'vant'
// 导入路由
import router from '../router'

// 封装公共方法

export default {
    // 查询是否登陆
    // key: 本地存储用户信息的key 储存的名字
    // next: 传入一个函数 单独定义一个函数
    // item: next函数需要的参数 下一步的操作
    checkLogin({ key, next, item }) {
        // 
        let user = localStorage.getItem(key)
        if (user) {
            next(item)
        } else {
            // 未登录
            Dialog.confirm({
                title: '检测到您未登录',
                message: '是否立即跳转到登录页面?',
            }).then(() => {
                // 跳转到登录页
                router.push('/Login')
            }).catch(() => {
                Toast('您取消了操作')
            })
        }
    },

    // 保存历史记录
    saveHistory({ key, data, attr }) {
        // key是名字 data是保存的数据, 
        // attr是属性名 用来判断是否重复
        //  让名字格式化
        let name = key + 'History'
        // 获取该名字的记录
        // let history = localStorage.getItem(name)
        // 存储获取到的值
        let stu;
        // 是否存在
        if (name) {
            //检测搜索记录存在时
            stu = JSON.parse(localStorage[name]);

            // 将新数据加入
            stu.unshift(data);
        } else {
            //不存在时
            stu = []; //存储数据形式
            stu.unshift(data);
        }
        //是否有传判断参数进来
        if (attr) {
            const res = new Map();
            stu = stu.filter((stu) => !res.has(stu[attr]) && res.set(stu[attr], 1))
        } else {
            stu = Array.from(new Set(stu))
        }
        stu = JSON.stringify(stu);
        // localStorage[name] = stuStr;
        localStorage.setItem(name, stu)
    },

    // 删除单个记录
    delHistoryOne({ key, value, id }) {
        // key 数据名 value 数据值 id判断额属性名
        let name = key + 'History'
        let stu;
        if (`${name}` in localStorage) {
            stu = JSON.parse(localStorage[name]);
            if (id) {
                stu = stu.filter((a) => {
                    return a[id] !== value[id];
                });
            } else {
                stu = stu.filter((a) => {
                    return a !== value;
                });
            }
            if (stu.length == 0) {
                localStorage.removeItem(`${name}`);
            } else {
                stu = JSON.stringify(stu);
                localStorage[name] = stu;
            }
        } else {
            return
        }

    },

    // 获取记录
    getHistory({ key }) {
        let name = key + 'History'
        let arr = JSON.parse(localStorage.getItem(name))
        if (arr) return arr
        else return null
    },
    // 数组去重 对象  arr是需要校验的数组 返回一个新数组来接收
    // key 是判断的属性名 [key] 变量
    unique(arr, key) {
        // 
        const res = new Map();
        return arr.filter((arr) => !res.has(arr[key]) && res.set(arr[key], 1));
    },
}

