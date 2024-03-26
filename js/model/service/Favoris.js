class MesFavoris {



    static getFavoris() {
        if (localStorage.getItem('favoris') === null) {
            localStorage.setItem('favoris', JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem('favoris'));
    }

    static addFavoris(id) {
        let favoris = this.getFavoris();
        favoris.push(id);
        localStorage.setItem('favoris', JSON.stringify(favoris));
    }

    static deleteFavoris(id) {
        let favoris = this.getFavoris();
        let index = favoris.indexOf(id);
        favoris.splice(index, 1);
        localStorage.setItem('favoris', JSON.stringify(favoris));
    }
}