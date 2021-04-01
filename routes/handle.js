const response = require('../utils/response')
const CMUDict = require('../lib/cmudict').CMUDict;
var cmu = new CMUDict();

const ReqOut = require('../outhttp/index')


let options = {
    host: 'adserver.magics-ad.com',
    port: '443',
    path: '/autoSay/client/get_tts_token',
    method: 'GET',
    headers:{
        "Content-Type": 'application/json; charset=utf-8',
    }
}
ReqOut.get(options).then(res=>{

}).catch(err=>{
    console.log(err)
})

const Alitts = require('../sound/puppeteer_tts')


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
    async getALITTS (req,res){
        let alitts = new Alitts()
        console.log(req.body)
        await alitts.txtToAudio(req.body.text,req.body.speechRate,req.body.volume,req.body.voiceName,req.body.pitchRate,req.body.format)
        let info_data =JSON.stringify(alitts.audio_info)
        res.header("interval-info",encodeURIComponent(info_data));
        res.header('Content-Type','audio/wav');
        // console.log(alitts.audio_buffer_str.buffer,alitts.audio_buffer_str)

        // let rawStr =  await  Buffer.from(alitts.base64_audio,'base64')
        // console.log('base64解码后的字符串: ',rawStr.buffer)

        // res.send(alitts.audio_buffer_str)

        // console.log(alitts.arraybuffer_audio.toLocaleString())
        response(res, 0 , '成功', {
            interval_info:alitts.audio_info,
            base64_audio:alitts.base64_audio,
            // arraybuffer_audio:alitts.arraybuffer_audio,
            // audio_buffer_str:alitts.audio_buffer_str,
            // audio_buffer_str2:new Uint8Array(rawStr.buffer)
        })

    }
}