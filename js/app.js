import Home from "./views/Home.js";
import Utils from "./model/service/Utils.js";
import PersonnageAll from "./views/PersonnageAll.js";
import Error404 from "./views/Error404.js";
import PersoShow from "./views/PersoShow.js";


const routes = {
    '/'             : Home
    ,
    '/personnages'  : PersonnageAll
    ,
    '/personnages/:id' : PersoShow
};

const router = async () => {

    // Lazy load view element:
    const content = null || document.querySelector('#content');

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    console.log('parsedURL', parsedURL)
    let page = routes[parsedURL] ? new routes[parsedURL] : Error404
    
    content.innerHTML = await page.render();
    // si on est sur la page de recherche lancée la fonction afterRender()
    if (page.afterRender) await page.afterRender();

    const head = document.querySelector('head');
    // head.appendChild(document.createElement('script')).src = 'js/model/service/LazyLoading.js';

}

// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);