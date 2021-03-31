// import NlsClient from 'ali-nls';
const  NlsClient = require('./nls-js-sdk.es5');

module.exports =  class ALITTS {
    constructor(_options) {

        this.client = new NlsClient({
            appkey: 'Tzd16kMbqie5agKS',
            accessToken: _options.access_token,
            // debug: true
        });

        this.isInTTS = false;
        this.isStop = false;
        this.isHandleTimeline = true;

        this.audioInfo = [];

        this.tempAudioInfo = {}; // 当前音频
        this.tempTimeline = []; // 当前音频的时间戳

    }

    refreshToken(_token) {
        console.log('ali refreshToken')
        this.client = new NlsClient({
            appkey: 'Tzd16kMbqie5agKS',
            accessToken: _token,
            // debug: true
        });
    }

    txtToAudio(_options) {
        this.isHandleTimeline = _options.isHandleTimeline;
        // console.log('alitts txtToAudio options: ', _options)
        return new Promise((res, rej) => {
            this.instance = this.client.initSynthesis({
                autoplay: false,
                voice: 'voiceName' in _options.tts ? _options.tts.voiceName : 'Siqi',
                volume: 'volume' in _options.tts ? _options.tts.volume : 50, // 音量，取值范围 0 ~ 100
                speechRate: 'speechRate' in _options.tts ? _options.tts.speechRate : 0, // 语速，取值范围 -500 ~ 500
                pitchRate: 'pitchRate' in _options.tts ? _options.tts.pitchRate : 0, // 语调，取值范围 -500 ~ 500
                enableSubtitle: true,
            });

            this.instance.start(_options.text)
            this.isInTTS = true;

            this.audioData = new Uint8Array().buffer;

            this.instance.on('completed', this.t2aCompleted.bind(this, res, _options));
            this.instance.on('metainfo', this.t2aMateinfo.bind(this));
            this.instance.on('dating', this.t2aDating.bind(this));
            this.instance.on('err', (res) => {
                console.log('🌟 ali TTS err')
                if(this.onerror) this.onerror(res)
            })
            this.instance.on('closed', () => {
                console.log('🌟 ali TTS closed')
            })
            this.instance.on('unknow', (res) => {
                console.log('🌟 ali TTS unknow')
                if(this.onunknow) this.onunknow(res)
            })
        })
    }

    stop() {
        console.log('🌟  stoped')
        this.isStop = true;
        this.instance.stop();
    }

    async t2aCompleted(_cb) {
        console.log('🌟 ali TTS t2aCompleted, ', this.isStop)
        if(this.isStop) {
            this.isStop = false;
            this.isInTTS = false;
            // _cb();
            return;
        }
        // if()
        this.tempAudioInfo.audio_buffer = this.audioData;
        if(this.isHandleTimeline) {
            this.tempAudioInfo.currentWordsTimeArr = await this.handleWordsTimeline(this.tempTimeline);
        }
        this.tempAudioInfo.timeline = this.tempTimeline;
        if(this.tempAudioInfo.timeline.length>0 ) {
            this.audioInfo.push(this.tempAudioInfo);
        }
        // console.log('音频信息：', this.audioInfo)
        this.audioData = new Uint8Array().buffer;
        this.tempTimeline = [];
        this.tempAudioInfo = {};
        this.isInTTS = false;
        if(this.oncompleted) this.oncompleted()
        _cb();
        return;
    }

    t2aMateinfo(res) {
        // console.log('🌟 ali TTS t2aMateinfo')
        this.tempTimeline = res.subtitles;
    }

    t2aDating(res) {
        // console.log('🌟 ali TTS t2aDating')
        this.audioData = this.appendBuffer(this.audioData, res);
    }

    appendBuffer(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    }

    async handleTimeline(_data) {
        this.tempAudioInfo.audio_buffer = _data.audio_buffer;
        this.tempAudioInfo.timeline = _data.timeline;
        this.tempAudioInfo.currentWordsTimeArr = await this.handleWordsTimeline(this.tempAudioInfo.timeline);
        this.audioInfo.push(this.tempAudioInfo);
        this.tempTimeline = [];
        this.tempAudioInfo = {};
        return;
    }

    handleWordsTimeline(_arr) {
        let currentWordsTimeArr=[];
        _arr.forEach((item, idx) => {
            delete item.phoneme;
            currentWordsTimeArr.push({
                phm: item.text,
                begin: item.begin_time/1000,
                duration: (item.end_time-item.begin_time)/1000
            })
        })
        return currentWordsTimeArr
    }

}
