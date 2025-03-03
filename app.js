// const filmController = new FilmController('index');

class Utility {
    static strToHTML(templateString) {
        var div = document.createElement("div");
        div.innerHTML = templateString.trim();
        return div.children;
    }

    static isIterable(object) {
        return object != null && typeof object[Symbol.iterator] === 'function';
    }
}

let app = $("#app");

let product_page = new Component({
    template: `
        <h1>Our products</h1>
        <article>
            <p>
                <ul>
                    <li for="products">{{ title }} - {{ price }}€</li>
                </ul>
            </p>
        </article>
        <form id="addProduct">
            <input type="text" id="productName" placeholder="Name" required>
            <input type="number" step="1" min="1" id="productPrice" placeholder="Price" required>
            <br>
            <button type="submit">Add</button>
        </form>
    `,
    root: app,
    state: {
        products: [
            {
                title: 'A beautiful table',
                price: 1999,
            },
            {
                title: 'A succulent vol-au-vent',
                price: 15,
            },
        ],
    },
});

let product_form =$('#addProduct');

product_form.on('submit', e => {
    e.preventDefault();

    product_page.setState({
        products: [...product_page.state.products.value, {
            title: $('#productName').value,
            price: $('#productPrice').value,
        }],
    });

    product_form.empty();
});

let other_component = new Component({
    template: `
        <hr>
        <p if="hidden">{{ test }}</p>
        <br>
        <button id="hideBtn">Hide text</button>
    `,
    root: app,
    state: {
        hidden: false,
        test: 'Hey from component 2!'
    },
});

$('#hideBtn').on('click', e => other_component.setState({
    hidden: !other_component.state.hidden.value
}));