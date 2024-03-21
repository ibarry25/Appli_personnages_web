import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';
import { PERSOPARPAGE } from '../config.js';

export default class PersonnageAll {

    async render() {

        // Fetching des données
        let types = await TypeProvider.fetchType();

        // Création du contenue html

        let options = types.map(type =>
            /*html*/`
                <option value="${type.id}">${type.nom}</option>
                `
                ).join('\n ');









        return /*html*/`
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          

          <form class="container text-center" id="searchBox"  >
            <h1>wiki viewer</h1>
            <div class="form col-xs-12">   
                <input class="col-xs-9" id="searchBar" type="text" placeholder="search" "/>
                <button class="col-xs-3" type="text" id="boutonRecherche">search</button>
                <select class="form-select" id="type" name="type">
                    <option value="0">Tous les types</option>
                    ${options}
                </select>
              </div>
            </div>
          </form>  
          


          <div id="personnages" class="row gap-2 mt-5"></div>

          <div class="pagination">
            <span class="page-btn page-step" data-shown="0">&laquo;</span>

            <div id="boutPagination" ">
              <span id="page-" class="page-btn"></span>
            </div>

              <span class="page-btn page-step ml-1" data-shown="-1">&raquo;</span>
          </div>
          
        </div>
          
        `;
    }

    
    async afterRender() {

      let personnages = await PersoProvider.fetchPerso(50);

      function createCard(perso) {
        return /*html*/`
        <div class="card col-md-2 mx-auto">
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
            } 
          })
          // Return the list of personnages
          return listPerso;
      }

      function showInPage(personnages, persoParPage=PERSOPARPAGE) {

        
              function afficherPage(personnages, persoParPage, direction=null) {

                // Calcul du nombre de page
                let nbPage = Math.ceil(personnages.length / persoParPage);

                let bouton = document.getElementById('page-');
                let page = parseInt(bouton.innerText) + (direction == null ? 0 : direction);

                if (page < 1) page = nbPage;
                if (page > nbPage) page = 1;

                let start = (page - 1) * persoParPage;
                let end = start + persoParPage;

                document.getElementById('personnages').innerHTML = personnages.slice(
                  start, end).map(
                    perso => createCard(perso)
                  ).join('\n');

                document.getElementById('page-').innerText = page;

                
              }

                let BoutonEnd =  document.querySelectorAll('.page-step');
                
                // Go to 1er page
                BoutonEnd[0].addEventListener('click',()=>{
                  // Supprimer la classe active de tous les boutons
                  afficherPage( personnages, persoParPage, -1);


                })

                BoutonEnd[1].addEventListener('click',()=>{
                  // Supprimer la classe active de tous les boutons
                  afficherPage( personnages, persoParPage, 1);

                })

              
              // Pagination


              document.getElementById('page-').innerText = 1;


              // affiche la 1er page par defaut
              afficherPage(personnages,persoParPage);
                
            
      
          
      }
        
      

      //A little delay
      let typingTimer;
      let typeInterval = 100;  
      let searchInput = document.getElementById('searchBar');
      let searchButton = document.getElementById('boutonRecherche');
      let typeSelect = document.getElementById('type');

      if (searchInput.value.trim() === '' && typeSelect.value === '0') {
          showInPage(personnages);
          // ajoute la classe active au bouton 1 en actif
          // document.getElementById('page-1').classList.add('active');
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

