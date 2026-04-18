(function () {
    var gate = document.getElementById('pw-gate');
    if (!gate) return;

    if (sessionStorage.getItem('v2_unlocked') === '1') {
        gate.remove();
        return;
    }

    document.body.style.overflow = 'hidden';

    function unlock() {
        sessionStorage.setItem('v2_unlocked', '1');
        gate.style.opacity = '0';
        setTimeout(function () {
            gate.remove();
            document.body.style.overflow = '';
        }, 400);
    }

    window._checkPw = function () {
        var input = document.getElementById('pw-input');
        var err = document.getElementById('pw-err');
        if (input.value === 'wuwei') {
            unlock();
        } else {
            err.classList.add('visible');
            input.value = '';
            input.focus();
        }
    };

    document.getElementById('pw-input').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') window._checkPw();
        document.getElementById('pw-err').classList.remove('visible');
    });
})();
