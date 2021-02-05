import Vivus from "vivus";

const menu = document.getElementById('menu');
const getAnimateEnding = (items, next) => {
    for (let item of items) {
        item.classList.add('visible');
        if (next && typeof next === 'function') {
            item.addEventListener('animationend', next);
        }
    }
};

export const showMenuItems = () => {
    const items = menu.querySelectorAll('.main-list-menu__title');
    getAnimateEnding(items, animateLineMenu);

    setTimeout(getAnimateSubItemMenu, 450)
};

const getAnimateSubItemMenu = () => {
    const items1 = menu.querySelectorAll('.animate-item-menu-1');
    getAnimateEnding(items1);

    const items2 = menu.querySelectorAll('.line-svg_submenu');
    getAnimateEnding(items2);

    const items3 = menu.querySelectorAll('.animate-item-menu');
    getAnimateEnding(items3);

};

const getAnimateLineSubItemMenu = () => {
    const items = document.querySelectorAll('.line-svg_submenu');
    getAnimateEnding(items, getAnimateLastItemMenu);
};

const getAnimateLastItemMenu = () => {
    const items = menu.querySelectorAll('.animate-item-menu');
    getAnimateEnding(items);
};

// Функция для анимации svg в меню
export const animateLineMenu = (play = false, reset = false) => {
    const svgEls = document.getElementsByClassName('menu-svg-1');

    for (let i = 0; i < svgEls.length; i++) {
        let svgLine = new Vivus(svgEls[i], {
            start: 'manual'
        });

        if (play) {
            svgLine.play(5, function () {
                // getAnimateSubItemMenu()
            });
        } else if (reset) {
            svgLine.reset();
        } else {
            svgLine.stop();
        }
    }
};

export const stopAnimation = () => {
    const items = menu.querySelectorAll('.main-list-menu__title');
    const items1 = menu.querySelectorAll('.animate-item-menu-1');
    const items2 = menu.querySelectorAll('.line-svg_submenu');
    const items3 = menu.querySelectorAll('.animate-item-menu');


    if (window.innerWidth >= 990) {
        for (const item of items) {
            item.classList.remove('visible')
        }

        for (const item of items1) {
            item.classList.remove('visible')
        }

        for (const item of items2) {
            item.classList.remove('visible')
        }

        for (const item of items3) {
            item.classList.remove('visible')
        }

        animateLineMenu()
    }

    return false;
};
