import PersoProvider from '../model/service/PersoProvider.js';
import TypeProvider from '../model/service/TypeProvider.js';

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

            <div id="boutPagination" "> </div>

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

      function showInPage(personnages, persoParPage=3) {

        
              function afficherPage(page,personnages, persoParPage) {
                let start = (page - 1) * persoParPage;
                let end = start + persoParPage;

                document.getElementById('personnages').innerHTML = personnages.slice(
                  start,end).map(
                    perso => createCard(perso)
                  ).join('\n');
                
                  document.getElementById("page-"+page).classList.add('active');
            
              }

              function afficheBoutonPagination(nbPage){
                // Placement des boutons pour la pagination

                let pagination = Array.from({ length: nbPage }, (_, i) => i + 1).map(page =>
                  /*html*/`
                    <span id="page-${page}" class="page-btn">${page}</span>
                `
                  ).join('\n ');

                  document.getElementById("boutPagination").innerHTML = pagination;
              }

              function activerButton(nbPage){

                let lesBoutons = document.querySelectorAll('.page-btn');
                let BoutonEnd =  document.querySelectorAll('.page-step');

                lesBoutons.forEach(bouton => {
                  bouton.addEventListener('click', () => {
                      let page = parseInt(bouton.innerText);
                      console.log(page);
                      afficherPage(page,personnages,persoParPage);
                      // Supprimer la classe active de tous les boutons
                      lesBoutons.forEach(btn => btn.classList.remove('active'));
                    document.getElementById("page-"+page).classList.add('active');
                      
  
                  });

                });


                // Go to 1er page
                BoutonEnd[0].addEventListener('click',()=>{
                  // Supprimer la classe active de tous les boutons
                  lesBoutons.forEach(btn => btn.classList.remove('active'));
                  afficherPage(1, personnages, persoParPage);

                })

                BoutonEnd[1].addEventListener('click',()=>{
                  // Supprimer la classe active de tous les boutons
                  lesBoutons.forEach(btn => btn.classList.remove('active'));
                  afficherPage(nbPage, personnages, persoParPage);

                })

              }
                
              // Pagination


              let nbPage = Math.ceil(personnages.length / persoParPage);

              afficheBoutonPagination(nbPage);

                // Activer les boutons

                activerButton(nbPage)

                // affiche la 1er page par defaut
                afficherPage(1,personnages,persoParPage);
                
            
      
          
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

