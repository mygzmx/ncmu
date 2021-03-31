const request = require('request');
const fs = require('fs');
function processGETRequest(appkey, token, text, audioSaveFile, format, sampleRate) {
    var url = 'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts';
    /**
     * 设置URL请求参数。
     */
    url = url + '?appkey=' + appkey;
    url = url + '&token=' + token;
    url = url + '&text=' + text;
    url = url + '&format=' + format;
    url = url + '&sample_rate=' + sampleRate;
    // voice 发音人，可选，默认是xiaoyun。
    // url = url + "&voice=" + "xiaoyun";
    // volume 音量，范围是0~100，可选，默认50。
    // url = url + "&volume=" + 50;
    // speech_rate 语速，范围是-500~500，可选，默认是0。
    // url = url + "&speech_rate=" + 0;
    // pitch_rate 语调，范围是-500~500，可选，默认是0。
    // url = url + "&pitch_rate=" + 0;
    console.log(url);
    /**
     * 设置HTTPS GET请求。
     * encoding必须设置为null，HTTPS响应的Body为二进制Buffer类型。
     */
    var options = {
        url: url,
        method: 'GET',
        encoding: null
    };
    request(options, function (error, response, body) {
        /**
         * 处理服务端的响应。
         */
        if (error != null) {
            console.log(error);
        }
        else {
            var contentType = response.headers['content-type'];
            if (contentType === undefined || contentType != 'audio/mpeg') {
                console.log(body.toString());
                console.log('The GET request failed!');
            }
            else {
                fs.writeFileSync(audioSaveFile, body);
                console.log('The GET request is succeed!');
            }
        }
    });
}
function processPOSTRequest(appkeyValue, tokenValue, textValue, audioSaveFile, formatValue, sampleRateValue) {
    var url = 'https://nls-gateway.cn-shanghai.aliyuncs.com/stream/v1/tts';
    /**
     * 请求参数，以JSON格式字符串填入HTTPS POST请求的Body中。
     */
    var task = {
        appkey : appkeyValue,
        token : tokenValue,
        text : textValue,
        format : formatValue,
        sample_rate : sampleRateValue
        // voice 发音人，可选，默认是xiaoyun。
        // voice : 'xiaoyun',
        // volume 音量，范围是0~100，可选，默认50。
        // volume : 50,
        // speech_rate 语速，范围是-500~500，可选，默认是0。
        // speech_rate : 0,
        // pitch_rate 语调，范围是-500~500，可选，默认是0。
        // pitch_rate : 0
    };
    var bodyContent = JSON.stringify(task);
    console.log('The POST request body content: ' + bodyContent);
    /**
     * 设置HTTPS POST请求头部。
     */
    var httpHeaders = {
        'Content-type' : 'application/json'
    }
    /**
     * 设置HTTPS POST请求。
     * encoding必须设置为null，HTTPS响应的Body为二进制Buffer类型。
     */
    var options = {
        url: url,
        method: 'POST',
        headers: httpHeaders,
        body: bodyContent,
        encoding: null
    };
    request(options, function (error, response, body) {
        /**
         * 处理服务端的响应。
         */
        if (error != null) {
            console.log(error);
        }
        else {
            var contentType = response.headers['content-type'];
            if (contentType === undefined || contentType != 'audio/mpeg') {
                console.log(body.toString());
                console.log('The POST request failed!');
            }
            else {
                fs.writeFileSync(audioSaveFile, body);
                console.log('The POST request is succeed!');
            }
        }
    });
}
var appkey = 'Tzd16kMbqie5agKS';
var token = '24a27387b0f24ff199215e600c6db8af';
var text = '今天是周一，天气挺好的。';
var textUrlEncode = encodeURIComponent(text)
    .replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
console.log(textUrlEncode);
var audioSaveFile = 'syAudio.wav';
var format = 'wav';
var sampleRate = 16000;
processGETRequest(appkey, token, textUrlEncode, audioSaveFile, format, sampleRate);
// processPOSTRequest(appkey, token, text, audioSaveFile, format, sampleRate);