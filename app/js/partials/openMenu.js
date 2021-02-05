import {animateLineMenu, showMenuItems, stopAnimation} from "./animateMenu";

const openMenu = () => {
    const menu = document.querySelector('.menu--inner')
    const button = document.querySelector('.button-menu');

    if (button) {
        button.addEventListener('click',  () => {
            menu.classList.add('menu--open');
            button.setAttribute('aria-expanded', 'true')
            showMenuItems();
        });

        menu.addEventListener('click',  (e) => {
            if (e.target === menu) {
                menu.classList.remove('menu--open');
                button.setAttribute('aria-expanded', 'false')
                stopAnimation();
            }
        });
    }
}

export {openMenu}
