class FilmController {
    constructor(page, args = []) {
        this.model = new Film();
        this.views = new FilmViews(this);
        this.cache = {
            show: {},
            search: {},
            form: null
        };

        this.call(page, args);
    }

    call(page, args = []) {
        this[page](...args);
    }

    index() {
        this.model.getAll().then(json => {
            this.views.list(json.films)();
        });
    }

    search(queryString) {
        if (this.cache.search[queryString]) {
            this.cache.search[queryString]();
        } else {
            this.model.search(queryString).then(json => {
                this.cache.search[queryString] = this.views.list(json.films);
                this.cache.search[queryString]();
            });
        }
    }

    show(id) {
        if (this.cache.show[id]) {
            this.cache.show[id]();
        } else {
            this.model.get(id).then(json => {
                this.cache.show[id] = this.views.show(json.film[0]);
                this.cache.show[id]();
            });
        }
    }

    form(film = null) {
        if (!film) {
            if (this.cache.form) {
                this.cache.form();
            } else {
                this.cache.form = this.views.form();
            }
        } else {
            this.views.form(film)();
        }
    }

    delete(id, titre) {
        this.model.delete(id).then(json => {
            if (json == 'Success') {
                popup($('#films'), '"' + titre + '" supprimé', 'green');
                this.cache.show[id] = null;
                this.index();
            } else {
                popup($('#film_show'), 'Echec de la suppression', 'red');
            }
        });
    }
}