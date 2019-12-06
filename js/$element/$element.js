class $element {
  static create(DOMElement) {
    let $e = new $element(DOMElement);
    return Object.assign(DOMElement, $e);
  }

  constructor(domElement) {
    this.displayStyle = domElement.dataset.display
      ? domElement.dataset.display
      : "block";
    this.listeners = {};
    this.textContentTemplate = domElement.textContent;
    this.innerHTMLTemplate = domElement.innerHTML;

    this.setTextContentTemplate = function(content) {
      this.textContentTemplate = content;
      return this;
    };

    this.hide = function() {
      this.style.display = "none";
      return this;
    };

    this.show = function() {
      this.style.display = this.displayStyle;
      return this;
    };

    this.on = function(event, callback, bind = null, opts = { once: false }) {
      if (bind) {
        callback = callback.bind(bind);
      }
      this.addEventListener(event, callback, opts);
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
      return () => this.removeEventListener(event, callback);
    };

    this.once = function(event, callback, bind = null) {
      return this.on(event, callback, bind, { once: true });
    };

    this.off = function(opts = { eventType: null, eventName: null }) {
      if (opts.eventType) {
        this.listeners[opts.eventType].forEach(callback =>
          this.removeEventListener(event, callback)
        );
      } else {
        for (const event in this.listeners) {
          this.listeners[event].forEach(callback =>
            this.removeEventListener(event, callback)
          );
        }
      }
    };

    this.add = function(child) {
      this.appendChild(child);
      return this;
    };

    this.clearAll = function() {
      Array.from(this.children).forEach(child => child.remove());
    };

    this.fill = function(data) {
      let inputs = Array.from(this.querySelectorAll("input")).map(input => {
        return {
          name: input.name,
          element: input
        };
      });

      inputs.forEach(input => {
        if (data[input.name]) {
          input.element.value = data[input.name];
        }
      });
    };

    this.empty = function() {
      Array.from(this.querySelectorAll("input")).map(
        input => (input.value = "")
      );
    };

    this.forEach = function(callback) {
      return callback(this);
    };

    this.style = function() {
      return getComputedStyle(this);
    };
  }
}
