const response = require('../utils/response')
const CMUDict = require('../lib/cmudict').CMUDict;
var cmu = new CMUDict();



module.exports = {
    // 登录路由处理
    async getCMUDict (req, res) {
        // let words = req.query.words
        let words = req.body.words.match(/[a-zA-Z]+/ig)
        let interval_info = '',interval_infoData = []
        console.log(words)
        words.forEach((val,ind)=>{
            interval_info = cmu.get(val) ? cmu.get(val).replace(/[0-9]+/g,'') : undefined
            interval_infoData.push(interval_info)
        })
                console.log(cmu.get('admin'))
        response(res, 0 , '成功', {interval_infoData})
    },
    async getJsonList (req,res){
        let avatar = req.body.avatar
        response(res, 0, '获取列表成功',  {})
    }
}