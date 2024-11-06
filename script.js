document.addEventListener("DOMContentLoaded", function () {
    if ('loading' in HTMLImageElement.prototype) {
        console.log('Browser supports lazy-loading');
    } else {
        console.log('Browser does not support lazy-loading');
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            img.dataset.src = img.src;
            img.src = '';
            observer.observe(img);
        });
    }
});