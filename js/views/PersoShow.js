import Utils from '../model/service/Utils.js';
import PersoProvider from '../model/service/PersoProvider.js';


export default class PersoShow {
    async render () {
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