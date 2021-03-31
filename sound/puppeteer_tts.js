const puppeteer = require('puppeteer');
const fs = require("fs");
module.exports = class Alitts {

    constructor(txt) {
        this.audio_info = '';
    }

    async txtToAudio(text,speechRate,volume,voiceName,pitchRate){
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage();
        //http://39.106.142.30:8001/index.html#/alitts外网访问
        //node服务器内网地址172.17.0.143
        let _url = 'http://172.17.0.143:8001/index.html#/alitts?text='+text+'&speechRate='+speechRate+'&volume='+volume+'&voiceName='+voiceName+'&pitchRate='+pitchRate
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


        // console.log('value',value,value2)
        this.audio_info = _currentWordsTimeArr;
        // this.audio_buffer = audio_buffer_str
        this.base64_audio = base64_audio
        await browser.close();
    }
}


