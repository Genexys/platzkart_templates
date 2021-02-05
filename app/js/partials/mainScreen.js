import smoothscroll from 'smoothscroll-polyfill';
import {animateLineMenu, showMenuItems, stopAnimation} from './animateMenu';

// Плагин для кастомного скрола
// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';

const mainScreen = () => {

    // kick off the polyfill!
    smoothscroll.polyfill();

    function limitNumberWithinRange(num, min = 0, max = 100) {
        const parsed = parseInt(num) || min;

        return Math.min(Math.max(parsed, min), max);
    }

    function debounce(func, timeout) {
        let timer;
        let time;

        return () => {
            const currentTime = Date.now();

            if (timer && currentTime - time < timeout) {
                clearTimeout(timer);
            }

            time = currentTime;
            timer = setTimeout(func, timeout);
        };
    }


    // Инициализирую, что бы плагин сработал
    animateLineMenu();

    document.addEventListener('DOMContentLoaded', () => {
        // const simpleBar = new SimpleBar(document.querySelector('.parallax'));
        // const simpleBarScrollElement = simpleBar.getScrollElement();
        const menu = document.querySelector('.menu');
        const parallax = document.querySelector('.main-page-wrapper');
        const logo = document.querySelector('.screen-logo-block-wrapper');
        const dummyBtn = document.querySelector('.btn-up-menu');

        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // We listen to the resize event
        window.addEventListener('resize', () => {
            // We execute the same script as before
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });


        function smoothScroll(value) {
            const roundedValue = Math.abs(Math.floor(value));
            const step = 5;
            let requestID;

            const scrollFrame = () => {
                const currentScroll = parallax.scrollTop;

                let nextValue;

                if (roundedValue - currentScroll > 0) {
                    nextValue = currentScroll + step;
                } else {
                    nextValue = currentScroll - step;
                }

                if (Math.abs(currentScroll - roundedValue) >= step) {
                    requestID = (scrollFrame);

                    parallax.scrollTo({
                        top: nextValue,
                        left: 0,
                        behavior: "smooth"
                    });
                }
            };

            scrollFrame();

            return () => {
                if (requestID) {
                    window.cancelAnimationFrame(requestID);
                }
            };
        }

        //функция которая показывает меню при скроле
        const upMenu = function () {
            if (logo) {
                const logoBox = logo.getBoundingClientRect();
                const logoBottom = logoBox.bottom;
                const contentHeight = parallax.clientHeight;
                const topMenu = menu.getBoundingClientRect().top;
                // menu.style.transform = `translate3d (0px, 100%, 0px)`;

                const smoothScroll = (pos) => {
                    const currentScroll = parallax.scrollTop;

                    parallax.scrollTo({
                        top: pos,
                        left: 0,
                        behavior: "smooth"
                    });
                };

                const showLogo = () => {
                    smoothScroll(0)

                };

                const showMenu = () => {
                    smoothScroll(topMenu)

                };

                const hasAvailableMenu = () => {

                    const numPercent = (parallax.scrollTop * 100) / (contentHeight / 2);
                    const percentScroll = 100 - limitNumberWithinRange(numPercent);

                    const percentLogoVisibility = limitNumberWithinRange(
                        (100 * (logoBottom - parallax.scrollTop)) / logoBottom
                    );

                    return Math.floor(numPercent) > 90;
                };

                const showMenuOrLogo = debounce(() => {
                    if (hasAvailableMenu()) {
                        showMenu();
                    } else {
                        showLogo();
                        stopAnimation();
                    }
                }, 1000);

                const scrollMenu = () => {
                    const numPercent = Math.round((parallax.scrollTop * 100) / contentHeight);
                    const percentScroll = 100 - limitNumberWithinRange(numPercent);

                    menu.style.transform = `translate3d(0px, ${percentScroll}%, 0px)`;
                    logo.style.transform = `translate3d(0, ${numPercent + 20}%, 0px)`;
                };

                const showAvailableSections = () => {
                    showMenuOrLogo();
                    const numPercent = (parallax.scrollTop * 100) / (contentHeight / 2);
                    const percentScroll = 100 - limitNumberWithinRange(numPercent);
                    if (Math.floor(numPercent) >= 190) {
                        //когда проскроленная часть становится больше запускаю анимацию меню и ставлю меню в фиксировануюпозицию
                        showMenuItems();
                    } else if (Math.floor(numPercent) <= 30) {
                        stopAnimation();
                    }
                };

                dummyBtn.addEventListener('click', function () {
                    showMenu();
                });

                //тут начинается вся штука
                parallax.addEventListener('scroll', function (e) {
                    // scrollMenu();
                    showAvailableSections();

                });

                menu.addEventListener('click', function (e) {
                    if (e.target === this)
                        showLogo();
                });
            }
        };

        upMenu();


        if (window.innerWidth <= 990) {
            const getMobileMenu = function () {
                const mobileMenu = document.querySelector(".main-list-menu");
                const mobileItem = mobileMenu.querySelectorAll(".main-list-menu__item");
                const sectionsMenu = mobileMenu.querySelectorAll(".sub-menu");
                const closeMobile = document.querySelector('.mobile-nav-close__btn');
                const closeWrapper = document.querySelector('.mobile-nav-close');
                const mobileTitleMenu = document.querySelector('.main-nav__mobile-title');

                for (const item of mobileItem) {
                    const link = item.querySelector("a.main-list-menu__title")
                    link.setAttribute('aria-expended', 'false');

                    link.addEventListener("click", function (e) {
                        const linkText = link.text;
                        const numSectionMenu = link.dataset.nameMenu

                        mobileTitleMenu.textContent = linkText;

                        for (const sectionItem of sectionsMenu) {
                            const dataNum = sectionItem.dataset.subMenu

                            if (numSectionMenu === dataNum) {
                                e.preventDefault()

                                mobileMenu.classList.add("open");
                                closeWrapper.classList.add("open");
                                closeMobile.classList.add("open");
                                sectionItem.classList.add("open");
                                mobileTitleMenu.classList.add("open");
                                link.setAttribute("aria-expended", "true");
                            }
                        }
                    })
                }

                closeMobile.addEventListener("click", function () {
                    this.classList.remove("open")
                    mobileMenu.classList.remove("open")
                    closeWrapper.classList.remove("open");
                    mobileTitleMenu.classList.remove("open");

                    for (const item of mobileItem) {
                        const link = item.querySelector("a")
                        link.setAttribute('aria-expended', 'false');
                    }

                    for (const sectionItem of sectionsMenu) {
                        if (sectionItem.classList.contains("open")) {
                            sectionItem.classList.remove("open")
                        }
                    }
                })
            }

            getMobileMenu();
        }

        if (logo) {
            const logoBox = logo.getBoundingClientRect();
            const logoBottom = logoBox.top;

            // init controller
            var controller = new ScrollMagic.Controller({container: '.main-page-wrapper'});

            const parllaxTL = new TimelineMax();

            parllaxTL
                .to('.screen-logo-block-wrapper', 1, {top: `-${logoBottom + logoBox.height}px`}, 0);

            let scene;

            scene = new ScrollMagic.Scene({
                triggerElement: '.menu',
                triggerHook: 1,
                duration: '282%',
            });

            scene.setTween(parllaxTL)
                .addTo(controller);
        }

    });

}

export {mainScreen}
