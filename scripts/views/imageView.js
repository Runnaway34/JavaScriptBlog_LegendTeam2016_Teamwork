class ImageView {
    constructor(selector, mainContentSelector) {
        this._selector = selector;
        this._mainContentSelector = mainContentSelector;
    }
    showImagesPage(data) {
        let _that = this;
        let theData = {
           images: data
        };
        $.get('templates/images.html', function (template) {
            var renderMainContent = Mustache.render(template, theData);
            $(_that._mainContentSelector).html(renderMainContent);
        });
    }
}
