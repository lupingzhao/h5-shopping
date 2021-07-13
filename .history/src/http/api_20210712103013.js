// 封装所有的请求
import http from './index'
// 在index 文件下已将axios变为http
export default {
    // get参数不用{}包裹
    // 首页数据
    index() {
        return http.get('/recommend')
    },
    // 搜索
    search({ value }) {
        return http.post('/search', {
            value
        })
    },
    // 分类查询
    classify(id) {

        return http.get(`/classification?mallSubId=${id}`)
        // return http.get('/classification')
    },
    // 购物车数据
    getCard() {
        return http.post('/getCard')
    },
    // 购物车加减商品(post)
    editCart({ count, id, mallPrice }) {
        return http.post('/editCart', {
            count,
            id,
            mallPrice
        })
    },
    // 删除购物车数据
    deleteShop(id) {
        return http.post('/deleteShop', id)
    },
    // 购物车支付  
    // args是所有参数的对象数组
    // 参数：address:收货地址,tel:电话，orderId：所有商品的id，totalPrice：总价格,idDirect:用来判断是购物车结算还是直接购买,count:商品数量
    placeOrder({ ...args }) {
        return http.post('/order', args)
    },
    // .单个商品详情(get)
    goodOne(id) {
        return http.get(`/goods/one?id=${id}`)
    },
    // 收藏单个商品(post)
    collection({ goods }) {
        return http.post('/collection', goods)
    },
    // 取消收藏(post)
    cancelCollection({ id }) {
        return http.post('/cancelCollection', { id })
    },
    // 查询商品是否已收藏(post)
    isCollection({ id }) {
        return http.post('/isCollection', { id })
    },
    // 加入购物车(post)
    addShop({ id }) {
        return http.post('/addShop', { id })
    },
    // 退出登录(post)
    loginOut() {
        return http.post('/loginOut')
    },
    // 获取用户信息(post)
    user() {
        return http.post('/queryUser')
    },
    // 修改保存用户信息(post) 对象数组  ...转成单个对象
    saveUser({ gender, day, month, year, id, nickname }) {
        return http.post('/saveUser', { gender, day, month, year, id, nickname })
    },
    // 商品评论(post)
    comment({ ...args }) {
        return http.post('/goodsOne/comment', args)
    },
    // 获取登录注册默认验证码(get)
    getAverify() {
        return http.get('/verify')
    },
    // 查询用户收货地址(get)
    getAddress() {
        return http.get('/getAddress')
    },
    // 查询用户默认收货地址(get)
    getDefaultAddress() {
        return http.get('/getDefaultAddress')
    },
    // 设置默认收货地址(get)
    setDefaultAddress({ id }) {
        return http.post('/setDefaultAddress', { id })
    },
    // 增加收货地址(post)
    postAddress({ ...args }) {
        return http.post('/address', args)
    },
    //  删除地址(post)
    deleteAddress({ id }) {
        return http.post('/deleteAddress', { id })
    },

    // 注册(post)
    register({ nickname, password, verify, sms }) {
        return http.post('/register', {
            nickname,
            password,
            verify,
            sms
        })
    },
    // 登陆
    login({ nickname, password, verify }) {
        return http.post('/login', {
            nickname,
            password,
            verify
        })
    },

    // 订单查询(get)
    getMyOrder() {
        return http.get('/myOrder')
    },
    // 查询已评价(get)
    alreadyEvaluated() {
        return http.get('/alreadyEvaluated')
    },
    // 查询未评价(get)
    tobeEvaluated(page = 1) {
        return http.get('/tobeEvaluated')
    },
    // 查询单条评论(post)
    evaluateOne({ _id, id }) {
        return http.post('/evaluateOne', {
            id,
            _id
        })
    }
}