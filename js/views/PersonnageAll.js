import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';

export default class PersonnageAll {

    async afterRender() {

        function liveSearch() {
            // Locate the card elements
            let cards = document.querySelectorAll('.card')
            // Locate the search input
            let search_query = document.getElementById("searchBar").value;
            console.log(search_query);
            // Loop through the cards
            for (var i = 0; i < cards.length; i++) {
              // If the text is within the card...
              if(cards[i].innerText.toLowerCase()
                // ...and the text matches the search query...
                .includes(search_query.toLowerCase()) 
                // ...and the type matches the selected type...
                && (document.getElementById("type").value == 0 || 
                    cards[i].innerText.toLowerCase().includes(document.getElementById("type").value.toLowerCase()))
                ) {
                  // ...remove the `.is-hidden` class.
                  cards[i].classList.remove("is-hidden");
              } else {
                // Otherwise, add the class.
                cards[i].classList.add("is-hidden");
              }
            }
        }

        //A little delay
        let typingTimer;               
        let typeInterval = 500;  
        let searchInput = document.getElementById('searchBar');

        searchInput.addEventListener('keyup', () => {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(liveSearch, typeInterval);
        });
    }


    async render() {

        // Fetching des données
        let personnages = await PersoProvider.fetchPerso(50);
        let types = await TypeProvider.fetchType();

        // Création du contenue html

        let options = types.map(type =>
            /*html*/`
                <option value="${type.id}">${type.nom}</option>
                `
                ).join('\n ');


        let html = personnages.map(perso =>
            /*html*/`
                <div class="card">
                    <strong class="card-text">${perso.nom}</strong>
                    <img src="${perso.image}" class="card-img" alt="..." loading="lazy">
                    <div class="card-img-overlay">
                    </div>
                </div>
            `
        ).join('\n ');

        return /*html*/`
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          

          <form class="container text-center" id="searchBox"  >
            <h1>wiki viewer</h1>
            <div class="form col-xs-12">   
                <input class="col-xs-9" id="searchBar" type="text" placeholder="search" "/>
                <select class="col-xs-3" id="type" name="type">
                    <option value="0">Tous les types</option>
                    ${options}
                </select>
              </div>
            </div>
          </form>  
          


          <div class="d-flex  ">
          ${html}
          </div>
          
        </div>
          
        `;
    }



}
