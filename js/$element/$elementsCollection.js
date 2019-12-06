class $elementsCollection {
    constructor($elements) {
        this.elements = $elements;
    }

    hide() {
        return this.iterate(function ($element) {
            $element.style.display = 'none';
            return $element;
        });
    }

    show() {
        return this.iterate(function ($element) {
            $element.style.display = $element.displayStyle;
            return $element;
        });
    }

    on(event, passed_callback, bind = null, opts = { once: false }) {
        return this.iterate(function ($element) {
            return $element.on(event, passed_callback, bind, opts);
        });
    }

    once(event, passed_callback, bind = null) {
        return this.iterate(function ($element) {
            return $element.on(event, passed_callback, bind, { once: true });
        });
    }

    off(eventName = null) {
        return this.iterate(function ($element) {
            return $element.off(eventName);
        });
    }

    forEach(callback) {
        return this.iterate(callback);
    }

    iterate(callback) {
        if (!this.elements) {
            return false;
        }

        let return_array = [];
        for (const $element of this.elements) {
            return_array.push(callback($element));
        }
        return return_array;
    }
}