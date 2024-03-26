import { ENDPOINT } from '../../config.js'

export default class PersoProvider {


    static fetchPerso = async (limit = 10) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Erreur fetch les persos : ', err)
       }
    }

    static getPerso = async (id) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}?id_personnage=` + id, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Erreur fetching perso', err)
       }
    }

    static rechercheNom = async (nom) => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
           const response = await fetch(`${ENDPOINT}?nom=${nom}`, options)
           const json = await response.json();
           return json
       } catch (err) {
           console.log('Erreur fetching perso', err)
       }
    }
}