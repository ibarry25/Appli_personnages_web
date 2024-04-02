import Utils from '../model/service/Utils.js';
import MesFavoris from '../model/service/FavorisProvider.js';
import PersoProvider from '../model/service/PersoProvider.js';
import LazyLoading from "../model/service/LazyLoading.js";
import NoteProvider from "../model/service/NoteProvider.js"; // Importez la classe NoteProvider
//import MesFavoris from '../model/service/Favoris.js';
import PersoProvider from '../model/service/PersoProvider.js';


export default class PersoShow {
    async render() {
        let request = Utils.parseRequestURL()
        const perso = await PersoProvider.getPerso(request.id)
        const notePerso = await NoteProvider.getNoteByPerso(perso[0].nom); // Récupérez la note du personnage
        // Faire la moyenne des notes en utilisant l'attribut note
        const note = notePerso.length > 0 ? Math.round(notePerso.map(note => note.note).reduce((a, b) => a + b) / notePerso.length) : 'Pas de note';
        const personnage = perso[0]
        return /*html*/ `
         <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <img src="../../img/600x400.png"  data-lazy="../../img/${personnage.image}" class="img-fluid" alt="${personnage.nom}">
                </div>
                <div class="col-md-8">
                    <h2>${personnage.nom}    |   <span class="badge badge-secondary">${note}/5</span></h2>
                    <p>${personnage.description}</p>
                    <div class="row">
                        <div class="col-md-6">
                            <button id="add" class="btn btn-primary">Ajouter aux favoris</button>
                            <button id="supp" class="btn btn-danger is-hidden">Supprimer des favoris</button>
                        </div>
                        <div class="col-md-6">
                            <form id="noteForm">
                                <div class=" row">
                                    <input max=5 type="number" style="width:40%!important" class="form-control" id="note" placeholder="Note ?">
                                    <button type="submit" class="btn btn-primary">Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>    
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Vous pourriez aimer</h3>
                            <div id="like" class="row"> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        `
        
    }

    async afterRender() {
        let request = Utils.parseRequestURL()
        const perso = await PersoProvider.getPerso(request.id)
        const lesPersos = await PersoProvider.getAllByGenre(perso[0].types_personnage.id)
        const personnage = perso[0]
        const lstFavoris = Array.from(MesFavoris.getFavoris());

        let add = document.getElementById('add');
        let supp = document.getElementById('supp');
        let persoLike = document.getElementById('like');

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


        // Ajoutez un événement de soumission pour le formulaire de note
        document.getElementById('noteForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const noteValue = document.getElementById('note').value;
            console.log('noteValue', noteValue);
            if (await NoteProvider.ifPersoHasNote(personnage.nom)) {
                alert('Vous avez déjà ajouté une note pour ce personnage');
                // Proposez à l'utilisateur de modifier la note
                const rep = confirm('Voulez-vous modifier la note ?');
                if (rep) {
                    await NoteProvider.updateNoteByPerso(personnage, parseInt(noteValue));
                    alert('Note modifiée avec succès !');
                }

            }else{
                await NoteProvider.addNote(personnage, parseInt(noteValue));    
                alert('Note ajoutée avec succès !');
            }


            window.location.reload();
        });

        
      function createCard(perso) {
        return /*html*/`
        <div class="col imgHome">
            <div class=" shadow-sm">
                <a href="#/personnages/${perso.id_personnage}" class="text-decoration-none text-dark effet">            
                    <img data-lazy="../../img/${perso.image}" class="bd-placeholder-img card-img-top" max-width="4vw" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                </a>
            </div>
        </div>
        `;
      }

        const persoAjoute = new Set();
        // Affichez 4 perso du même genre aléatoirement
        for (let i = 0; i < 4; i++) {
            const random = Math.floor(Math.random() * lesPersos.length);
            if (!persoAjoute.has(lesPersos[random].id_personnage) && lesPersos[random].id_personnage !== personnage.id_personnage) {
                persoAjoute.add(lesPersos[random].id_personnage);
                persoLike.innerHTML += createCard(lesPersos[random]);
            } else {
                continue;
            } 
        }

        const lazyLoading = new LazyLoading();
        lazyLoading.applyLazyLoading();
    }
}
