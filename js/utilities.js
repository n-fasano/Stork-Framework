Array.prototype.clone = function () {
    return this.map(val => val);
}

let $ = function (name) {
    let results = document.querySelectorAll(name);
    Array.from(results).map(result => {
        Object.assign(result, new $element(result))
    });
    if (results.length == 1) {
        return results[0];
    }
    return new $elementsCollection(results);
}

let $_ = Component.createElementFromHTML;

let popup = function (append, text, color) {
    let popup = $('#popup');
    if (popup) {
        popup.remove();
    }

    popup = `
                    <div id="popup">
                        <p id="popup_text"></p>
                        <div id="popup_close">
                            <span class=""></span>
                            <span class=""></span>
                        </div>
                    </div>
                `;

    append.insertBefore($_(popup), append.children[0]);

    $('#popup_text').textContent = text;
    $('#popup').style.display = 'block';
    $('#popup').style.borderColor = color;
    $('#popup').style.color = color;
    $('#popup_close').on('click', () => $('#popup').remove());
    setTimeout(() => {
        popup = $('#popup');
        if (popup) {
            popup.remove();
        }
    }, 10000);
}