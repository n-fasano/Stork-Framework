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

let product = {
    name: "Un super téléphone",
    price: 200
};

let html = `
    <h1 if="hidden">{{ name }}</h1>
    <article>
        <p>
            <ul for="products">
                <li>{{ title }}</li>
                <li>{{ price }} €</li>
            </ul>
        </p>
    </article>
    <input type="text" id="input_title">
    <button id="hideBtn">Click me mofo ({{ hidden }})</button>
`;

let product_page = new Component({ template: html, root: app, state: product });

let html2 = `
    <p>{{ test }}</p>
`;

let component2 = new Component({
    template: html2,
    root: app,
    state: {
        test: 'coucou'
    }
});

let products = [
    {
        title: 'Une belle table',
        price: 2001
    },
    {
        title: 'Un vol-au-vent succulent',
        price: 48
    }
];

$('#input_title').on('input', e => product_page.setState({ name: e.target.value }));
$('#hideBtn').on('click', e => product_page.setState({
    hidden: !product_page.state.hidden.value
}));

product_page.setState({ products: products });

function changeTitle(e) { }