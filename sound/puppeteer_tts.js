const puppeteer = require('puppeteer');
const fs = require("fs");

function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 每个字符占用2个字节
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}

module.exports = class Alitts {
    constructor() {
        this.audio_info = '';
    }

    async txtToAudio(text,speechRate,volume,voiceName,pitchRate,format){
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage();
        //http://39.106.142.30:8001/index.html#/alitts外网访问
        //node服务器内网地址172.17.0.143
        let _url = 'http://172.17.0.143:8001/index.html#/alitts?text='+encodeURIComponent(text)+'&speechRate='+speechRate+'&volume='+volume+'&voiceName='+voiceName+'&pitchRate='+pitchRate+'&format='+format
        console.log('_url',_url)
        await page.goto(_url);

        // await page.screenshot({path: 'example.png'});
        await page.waitForSelector('.alitts_data');
        let _currentWordsTimeArr = await page.evaluate( () => {
            return  window.currentWordsTimeArr
        })
        // let audio_buffer_str = await page.evaluate( () => {
        //     return  window.audio_buffer_str
        // })
        let base64_audio = await page.evaluate( () => {
            return  window.base64_audio
        })
        // let arraybuffer_audio = await page.evaluate( () => {
        //     return  window.arraybuffer_audio
        // })

        this.audio_info = _currentWordsTimeArr;
        // this.audio_buffer_str = str2ab(audio_buffer_str)
        this.base64_audio = base64_audio

        // this.arraybuffer_audio = arraybuffer_audio
        await browser.close();
    }
}


