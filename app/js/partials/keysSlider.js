const keysSlider = () => {
    const sliders = document.querySelectorAll('.keys-slider');

    for (const sliderItem of sliders) {

        const paginationBlock = sliderItem.parentNode.children[1];

        // console.log(paginationBlock)

        var mySwiper = new Swiper(sliderItem, {
            loop: true,
            slidesPerView: 'auto',

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            pagination: {
                el: paginationBlock,
                type: 'bullets',
                clickable: true
            },
        });
    }
}

export {keysSlider}
