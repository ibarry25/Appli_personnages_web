import Utils from '../model/service/Utils.js';
import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';

export default class PersoShow {
    async render() {
        let request = Utils.parseRequestURL();
        const personnage = await PersoProvider.getPerso(request.id);
        const perso = personnage[0];
        const type = await TypeProvider.fetchTypeById(perso.types_personnage.id);

        // Calculer la moyenne des notes
        const averageRating = this.calculateAverageRating(perso.note);
        

        return /*html*/ `
            <section class="section">
                <p> Nom : ${perso.nom} </p>
                <p> Description : ${perso.description}</p>
                <p> Type de Média : ${type[0].nom}</p>
                <p> Note moyenne : ${averageRating.toFixed(1)}</p>
                <img src="../../img/${perso.image}" alt="${perso.nom}">
                <form id="ratingForm">
                    <label for="rating">Note:</label>
                    <input type="number" id="rating" name="rating" min="1" max="5" required>
                    <button type="submit">Noter</button>
                </form>
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/personnages">Retour à la liste des personnages</a></p>
        `;

       
    }

    

    async after_render() {
        document.getElementById('ratingForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const rating = parseInt(document.getElementById('rating').value);
            console.log(rating);
            const request = Utils.parseRequestURL();
            const personnage = await PersoProvider.getPerso(request.id);
            const perso = personnage[0];

            // Ajouter la note à la liste de notes du personnage
            this.addRatingToCharacter(perso, rating);

            // Rediriger l'utilisateur vers la vue détail du personnage
            window.location.href = `/#/personnage/${perso.id_personnage}`;
        });

        
    }

    // Fonction pour ajouter une note à un personnage
    addRatingToCharacter(perso, rating) {
        perso.note.push(rating);
        // Mettre à jour le personnage avec la nouvelle note
        PersoProvider.updatePerso(perso);
    }

    // Fonction pour calculer la moyenne des notes d'un personnage
    calculateAverageRating(notes) {
        const sum = notes.reduce((total, rating) => total + rating, 0);
        const average = notes.length > 0 ? sum / notes.length : 0;
        return average;
    }

    

    
}
