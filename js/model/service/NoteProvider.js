import { ENDPOINT, ENDPOINTNOTE } from "../../config.js";

export default class NoteProvider {
    static async addNote(personnage, note, idUser=1) {
        try {
            const response = await fetch(ENDPOINTNOTE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // On envoie les données au format JSON pour modifier seulement la note du personnage
                body: JSON.stringify({ id:personnage.nom,id_personnage: personnage.id_personnage,id_User : idUser, note: note })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'ajout de la note');
            }

            const data = await response.json();
            return data; // Vous pouvez retourner les données de la réponse si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }

    static async getNoteByPerso(nomPersonnage) {
        try {
            const response = await fetch(`${ENDPOINTNOTE}?id=${nomPersonnage}`);

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la note');
            }

            const data = await response.json();
            return data; // Vous pouvez retourner les données de la réponse si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }

    static async ifPersoHasNote(nomPersonnage, idUser=1) {
        try {
            const response = await fetch(`${ENDPOINTNOTE}?id=${nomPersonnage}&id_User=${idUser}`);

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de la note');
            }

            const data = await response.json();
            return data.length > 0; // Vous pouvez retourner les données de la réponse si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }

    static async deleteNoteByPerso(nomPersonnage) {
        try {
            const response = await fetch(`${ENDPOINT}/${nomPersonnage}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression de la note');
            }

            const data = await response.json();
            return data; // Vous pouvez retourner les données de la réponse si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }


    static async updateNoteByPerso(personnage, note) {
        try {
            const response = await fetch(`${ENDPOINTNOTE}/${personnage.nom}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                // On envoie les données au format JSON pour modifier seulement la note du personnage
                body: JSON.stringify({ id:personnage.nom,id_personnage: personnage.id_personnage, note: note })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la modification de la note');
            }

            const data = await response.json();
            return data; // Vous pouvez retourner les données de la réponse si nécessaire
        } catch (error) {
            console.error('Erreur:', error);
            throw error;
        }
    }
}
