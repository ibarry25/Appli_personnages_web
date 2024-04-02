import PersoProvider from '../model/service/PersoProvider.js';
import MesFavoris from '../model/service/FavorisProvider.js';
import LazyLoading from "../model/service/LazyLoading.js";

export default class Home {
    async render() {
        let personnages = await PersoProvider.fetchPerso();


        let favoris = MesFavoris.getFavoris();
        console.log(favoris);
        let favorisSet = Array.from(favoris).reduce((acc, curr) => acc.add(curr), new Set());
        console.log(favorisSet);
        let persoAffiche = Array.from(personnages).filter(perso => favorisSet.has(perso.id_personnage));
        console.log(persoAffiche);
        
        let html = persoAffiche.map(perso =>
            /*html*/`
            <div class="col imgHome">
            <div class=" shadow-sm">
            <a href="#/personnages/${perso.id_personnage}" class="text-decoration-none text-dark effet">
            
            <img data-lazy="../../img/${perso.image}" class="bd-placeholder-img card-img-top" max-width="4vw" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">

            
            </a>

                <div class="card-body" style="display:none;">
                    <p class="card-text">${perso.description ? perso.description.slice(0, 100) : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
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
            <section class=" text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Personnages</h1>
                        <h1 class="header_title mb-0 mt-3">I Am <span id="element" class=" fw-bold" data-elements="protected and secure.,safe and flawless."></span></h1>
                        <p class="lead text-muted">Découvrez les personnages de Serie</p>
                        <p>
                            <button id='aleatoire' class="btn btn-primary my-2">Perso aléatoire</button>
                            <button id='aleatoire-favoris' class="btn btn-secondary my-2">Perso aléatoire dans les Favoris</button>
                        </p>
                    </div>
                </div>
            </section>
            <h2>Vos favoris</h2>
            <div class="row perso">
                ${html}
            </div>
        `;
    }

    async afterRender() {
        const lazyLoading = new LazyLoading();
        lazyLoading.applyLazyLoading();

        let personnages = await PersoProvider.fetchPerso(10);
        let favoris = MesFavoris.getFavoris();


        let aleatoire = document.getElementById('aleatoire');
        aleatoire.addEventListener('click', async function() {
            let random = Math.floor(Math.random() * personnages.length);
            window.location.href = `#/personnages/${personnages[random].id_personnage}`;
        });

        let aleatoireFavoris = document.getElementById('aleatoire-favoris');
        aleatoireFavoris.addEventListener('click', async function() {
            let random = Math.floor(Math.random() * favoris.length);
            window.location.href = `#/personnages/${favoris[random]}`;
        }

        );

        // Lancer le script suivant 


        // Charger Typed.js dynamiquement
        const typedScript = document.createElement('script');
        typedScript.src = 'js/script/typed.js';
        typedScript.async = true;
        document.body.appendChild(typedScript);

        // Attendre le chargement complet de Typed.js avant de l'utiliser
        typedScript.onload = () => {
            // Appliquer Typed.js une fois qu'il est chargé
            $(".element").each(function() {
                var $this = $(this);
                $this.typed({
                    strings: $this.attr('data-elements').split(','),
                    typeSpeed: 100,
                    backDelay: 3000,
                });
            });
        };
    }
            
}
