import PersoProvider from '../model/service/PersoProvider.js';


export default class PersonnageAll {
    async render() {


        let personnages = await PersoProvider.fetchPerso(50);


        const search = async () => {
            let search = document.getElementById('searchBar').value;
            console.log(search);
            let personnages = await PersoProvider.rechercheNom(search);
            console.log(personnages);
        }

        let html = personnages.map(perso =>
            /*html*/`
                <div class="card">
                    <img src="${perso.image}" class="card-img" alt="..." loading="lazy">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${perso.nom}</h5>
                    </div>
                </div>

            `
        ).join('\n ');

        console.log(search);

        return /*html*/`
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          

          <form class="container text-center" id="searchBox"  >
            <h1>wiki viewer</h1>
            <div class="form col-xs-12">   
                <input class="col-xs-9" id="searchBar" type="text" placeholder="search" onChange="${search}"/>
                <button class="btn btn-primary col-xs-2" id="searchButton">Search</button>
              </div>
            </div>
          </form>  
          


          <div class="d-flex justify-content-between ">
          ${html}
          </div>
          
        </div>
          
        `;
    }



}
