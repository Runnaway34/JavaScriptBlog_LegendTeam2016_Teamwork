class AudioController {
    constructor(audioView, requester, baseUrl, appKey) {
        this._audioView = audioView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/audio/";
    }
    showAudioPage() { //show the audio page
        let _that = this;
        let audioBaseUrl = this._baseServiceUrl;
        this._requester.get(audioBaseUrl,
            function success(data) {
                _that._audioView.showAudioPage(data);
                
            },
            function error(data) {
                showPopup('error', "Error");
            });
    }
}