class AudioView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }

    showAudioPage(data) {
        let _that = this;
        let theData = {
            audio: data,
            title: data
        };
        $.get('templates/audio.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);

        });
    }
}