import { ENDPOINTTYPE } from "../../config.js";

export default class TypeProvider {


    static fetchType = async () => {
        const options = {
           method: 'GET',
           headers: {
               'Content-Type': 'application/json'
           }
       };
       try {
        const response = await fetch(`${ENDPOINTTYPE}`, options)
        const json = await response.json();
           return json
       } catch (err) {
           console.log('Erreur fetch les types : ', err)
       }
    }

    
}