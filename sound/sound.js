const ALITTS = require("./alitts")

module.exports = class AMSound {
    constructor() {

    }

    init(_type, _option, _isInitInacTTS) {
        this.type = _type;
        switch(_type) {
            case 'ali':
                this.TTS = new ALITTS(_option);
                this.TTSIsPCM = false;
                if(_isInitInacTTS) {
                    this.TTS_INAC = new ALITTS(_option);
                }
                break;
        }
    }

    async txtToAudio(_data, _isInac) {
        if(_isInac) {
            return this.TTS_INAC.txtToAudio(_data);
        }else {
            return this.TTS.txtToAudio(_data);
        }
    }

    async refreshToken(_token) {
        await this.TTS.refreshToken(_token);
        if(this.TTS_INAC) await this.TTS_INAC.refreshToken(_token);
    }

    async handleTimeline(_data) {
        return this.TTS.handleTimeline(_data);
    }

    reset() {
        this.TTS.audioInfo = []
    }

    resetInac() {
        this.TTS_INAC.audioInfo = []
    }


}
