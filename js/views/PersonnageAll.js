import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';

export default class PersonnageAll {

    async render() {

        // Fetching des données
        let types = await TypeProvider.fetchType();

        // calculation pour la pagination
        let persoParPage = 3;
        let nbPage = Math.ceil(7 / persoParPage);


        // Création du contenue html

        let options = types.map(type =>
            /*html*/`
                <option value="${type.id}">${type.nom}</option>
                `
                ).join('\n ');




        let pagination = Array.from({ length: nbPage }, (_, i) => i + 1).map(page =>
            /*html*/`
              <span id="page-${page}" class="page-btn">${page}</span>
          `
            ).join('\n ');




        return /*html*/`
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          

          <form class="container text-center" id="searchBox"  >
            <h1>wiki viewer</h1>
            <div class="form col-xs-12">   
                <input class="col-xs-9" id="searchBar" type="text" placeholder="search" "/>
                <button class="col-xs-3" type="text" id="boutonRecherche">search</button>
                <select class="col-xs-3" id="type" name="type">
                    <option value="0">Tous les types</option>
                    ${options}
                </select>
              </div>
            </div>
          </form>  
          


          <div id="personnages" class="row gap-2 "></div>

          <div class="pagination">
            <span class="page-btn page-step" data-shown="0">&laquo;</span>

            ${pagination}

            <span class="page-btn page-step" data-shown="5">&raquo;</span>
            <!-- Next -->
            </div>
          
        </div>
          
        `;
    }

    
    async afterRender() {

      let personnages = await PersoProvider.fetchPerso(50);

      function createCard(perso) {
        return /*html*/`
        <div class="card col-md-2">
          <strong class="card-text">${perso.nom}</strong>
          <span class="card-text is-hidden">${perso.types_personnage.id}</span>
          <img src="${perso.image}" class="card-img" alt="..." loading="lazy">
          <div class="card-img-overlay"></div>
        </div>
        `;
      }


      function liveSearch(personnages) {

        let listPerso = [];

          // Locate the search input
          let search_query = document.getElementById("searchBar").value;
          console.log(search_query);
          // Loop through the personnages
          personnages.forEach(perso => {
        // If the name matches the search query...
        if(perso.nom.toLowerCase().includes(search_query.toLowerCase()) 
          // ...and the type matches the selected type...
          && (document.getElementById("type").value == 0 || 
          perso.types_personnage.id == parseInt(document.getElementById("type").value))
          ) {
            // ...add the perso to the list.
            listPerso.push(perso);
            // ...remove the `.is-hidden` class.
            // document.getElementById(`perso-${perso.id}`).classList.remove("is-hidden");
        } else {
          // Otherwise, add the class.
          // document.getElementById(`perso-${perso.id}`).classList.add("is-hidden");
        }
          })
          // Return the list of personnages
          return listPerso;
      }

      function showInPage(personnages, persoParPage=3) {

        
              function afficherPage(page,personnages, persoParPage) {
                let start = (page - 1) * persoParPage;
                let end = start + persoParPage;
                document.getElementById('personnages').innerHTML = personnages.slice(
                  start,end).map(
                    perso => createCard(perso)
                  ).join('\n');
              }
                
              // Pagination

              let lesBoutons = document.querySelectorAll('.page-btn');

              lesBoutons.forEach(bouton => {
                bouton.addEventListener('click', () => {
                    let page = parseInt(bouton.innerText);
                    console.log(page);
                    afficherPage(page,personnages,persoParPage);

                });

                // affiche la 1er page par defaut
                afficherPage(1,personnages,persoParPage);
                
            });
      


        
      }

      //A little delay
      let typingTimer;
      let typeInterval = 250;  
      let searchInput = document.getElementById('searchBar');
      let searchButton = document.getElementById('boutonRecherche');
      let typeSelect = document.getElementById('type');

      if (searchInput.value.trim() === '' && typeSelect.value === '0') {
          showInPage(personnages);
          // ajoute la classe active au bouton 1 en actif
          document.getElementById('page-1').classList.add('active');
      }

      searchButton.addEventListener('click', () => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(() => {
              showInPage(liveSearch(personnages));
          }, typeInterval);
      });

      typeSelect.addEventListener('change', () => {
          showInPage(liveSearch(personnages));
      });







  }



}

