const request = require('request');
const fs = require('fs');
// 长文本语音合成restful接口，支持post调用，不支持get请求。发出请求后，可以轮询状态或者等待服务端合成后自动回调（如果设置了回调参数）。
function requestLongTts4Post(textValue, appkeyValue, tokenValue, voiceValue, formatValue, sampleRateValue) {
    var url = "https://nls-gateway.cn-shanghai.aliyuncs.com/rest/v1/tts/async"
    console.log(url);
    // 请求参数，以JSON格式字符串填入HTTPS POST请求的Body中。
    var context = {
        device_id : "27d8",
    };
    var header = {
        appkey : appkeyValue,
        token : tokenValue,
    };
    var tts_request = {
        text : textValue,
        voice : voiceValue,
        format : formatValue,
        "sample_rate" : sampleRateValue,
        "enable_subtitle" : true
    };
    var payload = {
        "enable_notify" : false,
        "notify_url": "http://123.com",
        "tts_request" : tts_request,
    };
    var tts_body = {
        "context" : context,
        "header" : header,
        "payload" : payload
    };
    var bodyContent = JSON.stringify(tts_body);
    console.log('The POST request body content: ' + bodyContent);
    // 设置HTTPS POST请求头部。
    var httpHeaders = {'Content-type' : 'application/json'};
    // 设置HTTPS POST请求。
    // encoding必须设置为null，HTTPS响应的Body为二进制Buffer类型。
    var options = {
        url: url,
        method: 'POST',
        headers: httpHeaders,
        body: bodyContent,
        encoding: null
    };
    request(options, function (error, response, body) {
        // 处理服务端的响应。
        if (error != null) {
            console.log(error);
        } else {
            if(response.statusCode != 200) {
                console.log("Http Request Fail: " + response.statusCode + "; " + body.toString());
                return;
            }
            console.log("response result: " + body.toString());
            var code = 0;
            var task_id = "";
            var request_id = "";
            var json = JSON.parse(body.toString());
            console.info(json);
            for(var key in json){
                if(key=='error_code'){
                    code = json[key]
                } else if(key=='request_id'){
                    request_id = json[key]
                } else if(key == "data") {
                    task_id = json[key]["task_id"];
                }
            }
            if(code == 20000000) {
                console.info("Request Success! task_id = " + task_id);
                console.info("Request Success! request_id = " + request_id);
                /// 说明：轮询检查服务端的合成状态，轮询操作非必须，如果设置了回调url，则服务端会在合成完成后主动回调。
                waitLoop4Complete(url, appkey, token, task_id, request_id);
            } else {
                console.info("Request Error: status=" + $data["status"] + "; error_code=" + $data["error_code"] + "; error_message=" + $data["error_message"]);
            }
        }
    });
}
// 根据特定信息轮询检查某个请求在服务端的合成状态，轮询操作非必须，如果设置了回调url，则服务端会在合成完成后主动回调。
function waitLoop4Complete(urlValue, appkeyValue, tokenValue, task_id_value, request_id_value) {
    var fullUrl = urlValue + "?appkey=" + appkeyValue + "&task_id=" + task_id_value + "&token=" + tokenValue + "&request_id=" + request_id_value;
    console.info("query url = " + fullUrl);
    //while(true) {
    var timer = setInterval(() => {
            var options = {
                url: fullUrl,
                method: 'GET'
            };
            console.info("query url = " + fullUrl);
            request(options, function (error, response, body) {
                    // 处理服务端的响应。
                    if (error != null) {
                        console.log(error);
                    } else if(response.statusCode != 200) {
                        console.log("Http Request Fail!: " + response.statusCode + "; " + body.toString());
                        return;
                    } else {
                        console.log("query result: " + body.toString());
                        var code = 0;
                        var task_id = "";
                        var output_url = "";
                        var json = JSON.parse(body.toString());
                        console.info(json);
                        for(var key in json){
                            if(key=='error_code'){
                                code = json[key]
                            } else if(key=='request_id'){
                                request_id = json[key]
                            } else if(key == "data" && json["data"] != null) {
                                task_id = json[key]["task_id"];
                                audio_address = json[key]["audio_address"];
                            }
                        }
                        if(code == 20000000 && audio_address != "") {
                            console.info("Tts Finished! task_id = " + task_id);
                            console.info("Tts Finished! audio_address = " + audio_address);
                            // 退出轮询。
                            clearInterval(timer);
                        } else {
                            console.info("Tts Queuing...");
                        }
                    }
                }
            );
        }
        , 3000);
}
var appkey = 'Tzd16kMbqie5agKS';
var token = '24a27387b0f24ff199215e600c6db8af';
var text = '今天是周一，天气挺好的';
var voice = "Aixia";
var format = 'wav';
var sampleRate = 16000;
// requestLongTts4Post(text, appkey, token, voice, format, sampleRate)
module.exports =  requestLongTts4Post;