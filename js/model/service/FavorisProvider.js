class MesFavoris {



    static getFavoris()  {
        if (!'favoris' in localStorage) localStorage.setItem('favoris', JSON.stringify([]));

        return JSON.parse(localStorage.getItem('favoris'));

    }

    static addFavoris(id) {
        let favoris = Array.from(MesFavoris.getFavoris());
        favoris.push(id);
        localStorage.setItem('favoris', JSON.stringify(favoris));
        console.log(MesFavoris.getFavoris());
    }

    static deleteFavoris(id) {
        let favoris = Array.from(MesFavoris.getFavoris());
        if (!favoris.includes(id)) return;
        console.log(favoris.indexOf(id));
        let place = favoris.indexOf(id);
        favoris.splice(place, 1);
        localStorage.setItem('favoris', JSON.stringify(favoris));

    }
}

export default MesFavoris;