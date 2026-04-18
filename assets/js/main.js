(function () {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.sr').forEach(function (el) {
        observer.observe(el);
    });

    document.querySelectorAll('#mob a').forEach(function (link) {
        link.addEventListener('click', function () {
            document.getElementById('mob').classList.add('hidden');
        });
    });
})();
