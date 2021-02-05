const namingSlider = () => {
  const slidersLogo = document.querySelectorAll('.example-slider');
  const sliderWrapper = document.querySelectorAll('.example-slider-wrapper');

  for (const sliderItem of sliderWrapper) {
    const slider = sliderItem.querySelector('.example-slider')

    const prev = sliderItem.querySelector('.swiper-button-prev');
    const next = sliderItem.querySelector('.swiper-button-next');

    // console.log(sliderItem)
    var mySwiper = new Swiper(slider, {
      loop: true,

      navigation: {
        nextEl: prev,
        prevEl: next,
      },
    });
  }
}

export {namingSlider};
