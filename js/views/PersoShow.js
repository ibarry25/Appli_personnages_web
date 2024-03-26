import Utils from '../model/service/Utils.js';
import PersoProvider from '../model/service/PersoProvider.js';


export default class PersoShow {
    async render () {
        let request = Utils.parseRequestURL()
        let perso = await PersoProvider.getPerso(request.id)
        console.log('perso', perso);
        return /*html*/`
            <section class="section">
                <h1> Personnage id : ${perso.id_personnage}</h1>
                <p> Personnage Nom : ${perso.nom} </p>
                <p> Personnage description : ${perso.description} </p>
            </section>
            <p><a href="/">Retour à l'accueil</a></p>
            <p><a href="#/personnages">Retour à la liste des personnages</a></p>
        `
    }

    async after_render() {
        document.getElementById('delete').addEventListener('click', async () => {
            let request = Utils.parseRequestURL()
            await PersoProvider.deletePerso(request.id)
            window.location.href = '/#/personnages'
        })
    }

}  