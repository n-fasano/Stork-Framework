class FilmViews {
    constructor(controller) {
        this.controller = controller;

        this.formHTML = $_(`
            <form method="post">
                <input type="text" name="titre" id="titre" placeholder="Titre" value=""/>
                <input type="text" name="datesortie" id="datesortie" placeholder="Date de sortie (jj/mm/aaaa)" value=""/>
                <input type="text" name="description" id="description" placeholder="Description" value=""/>
                <button type="submit">Ajouter</button>
                <button class="back_link_films" id="back_film_new_films">Retour à la liste</button>
            </form>
        `);
    }

    list(films) {
        return () => {
            $('.tab').forEach(tab => tab.hide());
            $('#films_list').innerHTML = '';
            if (films) {
                for (let film of films) {
                    $('#films_list').append($_(`
                    <div class="film_div">
                        <a class="film_link" href="#/${film.id}" data-film_id="${
                        film.id
                        }">${
                        film.titre.titleCase()
                        }</a>
                    </div>
                    `));
                    $('#films_list').append($_(`<br>`));
                }
                let film_links = $('.film_link');
                console.log(film_links);
                film_links.forEach(link => link.once('click', (e) => {
                    this.controller.show(e.target.dataset.film_id);
                }));
            }
            $('#btn_new_film').once('click', () => {
                $('.tab').forEach(tab => tab.hide());
                this.form()();
            });
            $('#search_film').once('submit', (e) => {
                e.preventDefault();
                let val = e.target.search_input.value;
                if (val) {
                    this.controller.search(val);
                } else {
                    this.controller.index();
                }
            });
            $('#films').show();
        };
    }

    show(film) {
        return () => {
            $('.tab').forEach(tab => tab.hide());

            $('#film_show').querySelector('#film_titre').textContent = film.titre.titleCase();
            $('#film_show').querySelector('#film_datesortie').textContent = 'Sorti le : ' + film.datesortie;
            $('#film_show').querySelector('#film_description').textContent = film.description;
            $('#film_show').querySelector('#btn_film_delete').dataset.id_film = film.id;
            $('#film_show').querySelector('#btn_film_delete').dataset.titre_film = film.titre.titleCase();
            $('#film_show').show();

            $('.back_link_films').once('click', (e) => {
                e.preventDefault();
                this.controller.index();
            });
            $('#btn_film_delete').once('click', (e) => {
                this.controller.delete(e.target.dataset.id_film, e.target.dataset.titre_film);
            });
            $('#btn_chg_film').once('click', () => {
                this.form(film)();
            });
        };
    }

    form(film = null) {
        return () => {
            $('.tab').forEach(tab => tab.hide());
            $('#film_form').innerHTML = '';
            if (film) {
                this.formHTML.fill(film);
            }
            $('#film_form').add(this.formHTML).show();
            $('.back_link_films').once('click', (e) => {
                e.preventDefault();
                this.controller.index();
            });
        };
    }
}