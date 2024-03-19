import PersoProvider from '../model/service/PersoProvider.js';


export default class PersonnageAll {
    async render() {
        let personnages = await PersoProvider.fetchPerso(50);
        let html = personnages.map(perso =>
            /*html*/`
                <div class="card">
                    <img src="${perso.image}" class="card-img" alt="..." loading="lazy">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${perso.nom}</h5>
                        <p class="card-text">z</p>
                    </div>
                </div>

            `
        ).join('\n ');

        return /*html*/`
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          

          <div class="container text-center" id="searchBox">
            <h1>wiki viewer</h1>
            <div class="form col-xs-12">   
                <input class="col-xs-9" id="searchBar" type="text" placeholder="search"/>
                <span class="glyphicon glyphicon-search col-xs-1" data-toggle="tooltip" title="Search"></span>
                <span class="glyphicon bar col-xs-1" id="submit"><b>|</b></span>
                <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank"><span class="glyphicon glyphicon-random col-xs-1"  data-toggle="tooltip" title="Random topic"></span></a>
              </div>
            </div>
          </div>  
          


          <div class="d-flex">
          ${html}
          </div>
          
        </div>
          
        `;
    }
}


