(function () {
    'use strict';

    // ===== SCROLL REVEAL =====
    var srObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                srObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.sr').forEach(function (el) {
        srObserver.observe(el);
    });

    // ===== MOBILE NAV =====
    document.querySelectorAll('#mob a').forEach(function (link) {
        link.addEventListener('click', function () {
            document.getElementById('mob').classList.add('hidden');
        });
    });

    // ===== CURSOR AMBIENT GLOW (desktop with fine pointer only) =====
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasFinePointer       = window.matchMedia('(pointer: fine)').matches;

    if (hasFinePointer && !prefersReducedMotion) {
        var glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.setAttribute('aria-hidden', 'true');
        document.body.appendChild(glow);

        var targetX = window.innerWidth  / 2;
        var targetY = window.innerHeight / 2;
        var currentX = targetX;
        var currentY = targetY;

        document.addEventListener('mousemove', function (e) {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        (function animateGlow() {
            // Exponential smoothing — lag factor controls "weight" feel
            currentX += (targetX - currentX) * 0.07;
            currentY += (targetY - currentY) * 0.07;
            glow.style.left = currentX + 'px';
            glow.style.top  = currentY + 'px';
            requestAnimationFrame(animateGlow);
        })();
    }

    // ===== STAT COUNTER ANIMATION =====
    // Animates any element with [data-count="N"] when it enters the viewport.
    // Uses an ease-out exponential curve for a premium deceleration feel.
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            var el       = entry.target;
            var target   = parseInt(el.getAttribute('data-count'), 10);
            var suffix   = el.getAttribute('data-suffix') || '';
            var duration = 1600;
            var startTs  = null;

            if (prefersReducedMotion) {
                el.textContent = target + suffix;
                counterObserver.unobserve(el);
                return;
            }

            (function step(ts) {
                if (!startTs) startTs = ts;
                var progress = Math.min((ts - startTs) / duration, 1);
                var eased    = 1 - Math.pow(2, -10 * progress); // ease-out expo
                var value    = Math.floor(eased * target);
                el.textContent = value + suffix;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target + suffix;
                }
            })(performance.now());

            counterObserver.unobserve(el);
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
        counterObserver.observe(el);
    });

})();
