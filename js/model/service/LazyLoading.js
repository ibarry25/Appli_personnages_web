const target = document.querySelectorAll('img');

const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

            console.log("image visible");

            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-lazy');
                
                img.setAttribute('src', src);
                img.classList.add('fade');
                observer.disconnect();
            }
        });
    });
    io.observe(target);
};
// On applique le lazy loading à chaque image
target.forEach(lazyLoad);