import PersoProvider from '../model/service/PersoProvider.js';
import MesFavoris from '../model/service/FavorisProvider.js';

export default class Home {
    async render() {
        let personnages = await PersoProvider.fetchPerso(10);


        let favoris = MesFavoris.getFavoris();
        let favorisSet = new Set(favoris);

        let persoAffiche = Array.from(personnages).filter(perso => favorisSet.has(perso.id_personnage));

        
        let html = persoAffiche.map(perso =>
            /*html*/`
            <div class="col imgHome">
            <div class="card shadow-sm">
                <img data-lazy="../../img/${perso.image}" class="bd-placeholder-img card-img-top" max-width="4vw" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                <div class="card-body">
                    <p class="card-text">${perso.description ? perso.description.slice(0, 100) : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <a href="#/personnages/${perso.id_personnage}" class="btn btn-sm btn-outline-secondary">+ détail sur ${perso.nom}</a>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            `
        ).join('\n ');

        if (html === '') {
            html = /*html*/`

            <div class="erreur">
                <p class="card-text">Aucun personnage n'a été ajouté à vos favoris</p>
            </div>

            `;
        }
        
        return /*html*/`
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Personnages</h1>
                        <p class="lead text-body-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem, aliquid voluptas sit aperiam quis architecto quaerat vel ratione placeat delectus repellendus cum animi sequi amet corporis minima ab, nisi at!</p>
                        <p>
                            <a href="" class="btn btn-primary my-2">Main call to action</a>
                            <a href="" class="btn btn-secondary my-2">Secondary action</a>
                        </p>
                    </div>
                </div>
            </section>
            <h2>Vos favoris</h2>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 perso">
                ${html}
            </div>
        `;
    }
}