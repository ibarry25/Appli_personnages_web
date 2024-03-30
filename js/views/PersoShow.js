import Utils from '../model/service/Utils.js';
import MesFavoris from '../model/service/FavorisProvider.js';
import PersoProvider from '../model/service/PersoProvider.js';
import LazyLoading from "../model/service/LazyLoading.js";


export default class PersoShow {
    async render () {
        let request = Utils.parseRequestURL()
        console.log('request', request)
        const perso = await PersoProvider.getPerso(request.id)
        const personnage = perso[0]
         return /*html*/`
         <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="../../img/600x400.png"  data-lazy="../../img/${personnage.image}" class="img-fluid" alt="${personnage.nom}">
                </div>
                <div class="col-md-8">
                    <h2>${personnage.nom}</h2>
                    <p>${personnage.description}</p>
                    <button id="add" class="btn btn-primary">Ajouter aux favoris</button>
                    <button id="supp" class="btn btn-danger is-hidden">Supprimer des favoris</button>
                </div>
            </div>
        </div>
        
        `
    }

    async afterRender() {

        let request = Utils.parseRequestURL()
        const perso = await PersoProvider.getPerso(request.id)
        const personnage = perso[0]
        const lstFavoris = Array.from(MesFavoris.getFavoris());


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

        const lazyLoading = new LazyLoading();
        lazyLoading.applyLazyLoading();
    }

    


}  