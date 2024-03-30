import { ENDPOINTNOTES } from "../../config.js";

export default class NoteProvider {

    static async getLastIdNote() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(`${ENDPOINTNOTES}`, options);
            const json = await response.json();
            return json[json.length - 1].idNote;
        } catch (err) {
            console.log('Erreur lors de la récupération de la dernière note : ', err);
            throw err;
        }
    }

    static async addRating(persoId, rating) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_personnage: persoId,
                note: rating
            })
        };

        try {
            const response = await fetch(`${ENDPOINTNOTES}?id_personnage=${persoId}`, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Erreur lors de l\'ajout de la note : ', err);
            throw err;
        }
    }

    static async updatePerso(perso) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(perso)
        };

        try {
            const response = await fetch(`${ENDPOINTNOTES}/${perso.id_personnage}`, options);
            const json = await response.json();
            return json;
        } catch (err) {
            console.log('Erreur lors de la mise à jour du personnage : ', err);
            throw err;
        }
    }
}
