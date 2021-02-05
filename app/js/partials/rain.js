const rain = () => {


    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function getRandomIntMin(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Функция для "дождя"
    const createDrop = function (dropNum) {
        const rainWrapper = document.getElementById('rain');

        if (rainWrapper) {
            let i;
            for (i = 1; i < dropNum; i++) {
                const rainDrop = document.createElement('div');
                rainDrop.classList.add('rain-drop');
                // rainDrop.style.left = ((100 / dropNum) * i) / 1.2 + '%';
                // rainDrop.style.left = Math.round(i * 100 / window.innerWidth * 100) + '%';
                rainDrop.style.left = Math.round( 100 / dropNum * (i * 1.3)) + '%';
                rainDrop.style.top = '-' + getRandomIntMin(0, 400) + 'px';

                if (i % 2) {
                    rainDrop.style.animationDuration = `${getRandomIntMin(1, 2)}.${getRandomInt(9)}s`;
                } else {
                    rainDrop.style.animationDuration = `${getRandomIntMin(3, 4)}.${getRandomInt(9)}s`;
                }

                rainWrapper.appendChild(rainDrop);
            }
        }
    };

// Указываю сколько линий нужно
    createDrop(18);
}

export {rain}
