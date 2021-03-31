const https = require('https')
// console.log(https)
module.exports = {
    // GET 请求
    get(options) {
        return new Promise((resolve,reject) => {

            let body = '';

            // 发出请求
            let req = https.request(options,(res) => {

                res.on('data',(data) => {// 监听数据
                    body += data;
                }).on("end", () => {
                    console.log("https DATA >>",body)
                    resolve(body);
                })
            });

            req.on("error",(e) => {
                console.log("https ERROR >>",e)
                reject(e)
            });

            //记住，用request一定要end，如果不结束，程序会一直运行。
            req.end();
        });
    },
// POST请求
    post(options,data) {
    // let options = {
    //     host: 'localhost',
    //     port: '7002',
    //     path: '/update',
    //     method: 'POST',
    //     headers:{
    //         "Content-Type": 'application/json',
    //         "Content-Length": data.length
    //     }
    // }

    return new Promise((resolve,reject) => {
        let body = '';
        let req = https.request(options,(res) => {
            res.on('data',(chuck) => {
                body += chuck;
            }).on('end', () => {
                resolve(JSON.parse(body))
            })
        });

        req.on('error',(e) => {
            reject(e)
        });

        req.write(data);
        req.end();
    });

}
}