import {namingSlider} from './namingSliders';
import {getFocusValue} from './getFocusValue';
import {openMenu} from './openMenu';
import {keysSlider} from './keysSlider';
import {animateLineBtn} from "./animteLineBtn";
import {portfolioSort} from "./portfolioSort";
import {validateFooterForm} from "./validateFooterForm";
import {mainScreen} from "./mainScreen";
import {footerSlide} from "./footerSlide";
import {rain} from "./rain";
import {lazyLoad} from "./lazyLoad";

const main = () => {
  document.addEventListener('DOMContentLoaded', function () {

    if (document.querySelectorAll(`input[type="tel"]`)[0]) {
      Inputmask({
        mask: "+7(999)999-99-99",
        showMaskOnHover: false,
      }).mask(document.querySelectorAll(`input[type="tel"]`));
    }

  });

  mainScreen();
  namingSlider();
  getFocusValue();
  openMenu();
  keysSlider();
  animateLineBtn();
  portfolioSort();
  validateFooterForm();
  // footerSlide();
  rain();
  lazyLoad()
}

export {main};
