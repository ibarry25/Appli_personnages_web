import PersoProvider from '../model/service/PersoProvider.js';

export default class PersonnageAll {
    async render() {
        let personnages = await PersoProvider.fetchPerso(50);
        let html = personnages.map(perso =>
            /*html*/`
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${perso.image}" class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <div class="card-body">
                        <p class="card-text">${perso.description ? perso.description.slice(0, 100) : ''}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a href="#/personnages/${perso.id}" class="btn btn-sm btn-outline-secondary">+ détail sur ${perso.nom}</a>
                            </div>
                            <small class="text-body-secondary">${perso.id}</small>
                        </div>
                    </div>
                </div>
            </div>
            `
        ).join('\n ');

        return /*html*/`
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                ${html}
            </div>
        `;
    }
}


