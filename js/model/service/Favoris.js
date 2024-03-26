class MesFavoris {



    static getFavoris()  {
        return JSON.parse(localStorage.getItem('favoris')) || [];
    }

    static addFavoris(id) {
        let favoris = MesFavoris.getFavoris();
        let ensFav = Set(favoris);
        ensFav.add(id);
        localStorage.setItem('favoris', JSON.stringify(favoris));
        console.log(MesFavoris.getFavoris());
    }

    static deleteFavoris(id) {
        let favoris = MesFavoris.getFavoris();
        let index = favoris.indexOf(id);
        favoris.splice(index, 1);
        localStorage.setItem('favoris', JSON.stringify(favoris));
        console.log(MesFavoris.getFavoris());

    }
}

export default MesFavoris;