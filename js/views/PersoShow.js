import Utils from '../model/service/Utils.js';
import MesFavoris from '../model/service/Favoris.js';
import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';


export default class PersoShow {
    async render () {
        let lesFavoris 
        let request = Utils.parseRequestURL()
        console.log('request', request)
        const personnage = await PersoProvider.getPerso(request.id)
        const perso = personnage[0]
        const type = await TypeProvider.fetchTypeById(perso.types_personnage.id)
        

        return /*html*/`
            <section class="section">
                <p> Nom : ${perso.nom} </p>
                <p> Description : ${perso.description}</p>
                <p> Type : ${type[0].nom}</p>
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/personnages">Retour à la liste des personnages</a></p>
            <img src="../../img/${personnage.image}" alt="${personnage.nom}">
        `
        
    }

    // async after_render() {
    //     document.getElementById('delete').addEventListener('click', async () => {
    //         let request = Utils.parseRequestURL()
    //         await PersoProvider.deletePerso(request.id)
    //         window.location.href = '/#/personnages'
    //     })
    // }

}  