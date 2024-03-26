import Utils from '../model/service/Utils.js';
import MesFavoris from '../model/service/Favoris.js';
import PersoProvider from '../model/service/PersoProvider.js';


export default class PersoShow {
    async render () {
        let lesFavoris 
        let request = Utils.parseRequestURL()
        console.log('request', request)
        const perso = await PersoProvider.getPerso(request.id)
        const personnage = perso[0]
         return /*html*/`
            <section class="section">
                <p> Nom : ${personnage.nom} </p>
                <p> Description : ${personnage.description} </p>
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/personnages">Retour à la liste des personnages</a></p>
            <img src="../../img/${personnage.image}" alt="${personnage.nom}">
            <button id="add" class="favoris">
                <i class="fa-regular fa-star"></i>
            </button>
            <button id="supp" class="favoris is-hidden">
                <i class="fa-solid fa-star"></i>
            </button>
            

        `
    }

    async afterRender() {

        let request = Utils.parseRequestURL()
        const perso = await PersoProvider.getPerso(request.id)
        const personnage = perso[0]
        const lstFavoris = MesFavoris.getFavoris();


        let add = document.getElementById('add');
        let supp = document.getElementById('supp');

        add.addEventListener('click', function() {
            console.log('add', personnage.id_personnage);
            MesFavoris.addFavoris(personnage.id_personnage);
            add.classList.add('is-hidden');
            supp.classList.remove('is-hidden');
        });

        supp.addEventListener('click', function() {
            MesFavoris.deleteFavoris(personnage.id_personnage);
            supp.classList.add('is-hidden');
            add.classList.remove('is-hidden');
        });

        if (lstFavoris.includes(personnage.id_personnage)) {
            add.classList.add('is-hidden');
            supp.classList.remove('is-hidden');
        }
    }

}  