class LazyLoading {
    constructor() {
        this.target = document.querySelectorAll('img');
        this.lazyLoad = this.lazyLoad.bind(this);
    }

    lazyLoad(target) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                console.log("image visible");

                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-lazy');
                    console.log(src);
                    img.setAttribute('src', src);
                    img.classList.add('fade');
                    observer.disconnect();
                }
            });
        });
        io.observe(target);
    }

    applyLazyLoading() {
        this.target.forEach(this.lazyLoad);
    }
}

export default LazyLoading;
