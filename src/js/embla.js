import EmblaCarousel from "embla-carousel";
import ClassNames from "embla-carousel-class-names";

const embla = {
  emblaAutoSlide: function () {
    //
  },

  // control embal
  emblaNavigation: function () {},
  addTogglePrevNextButtonsActive: function () {},
  addPrevNextButtonClickHandlers: function () {},

  //   dot
  addDotButtonAndClickHandlers: function () {},

  //   pagination count
  updateSelectedSnapDisplay: function () {},

  //   pagination progressBar
  setupProgressBar: function () {},

  //   pagination scrollbar
  addScrollBarListener: function () {},

  //   thumb
  addThumbButtonClickHandlers: function () {},
  addToggleThumbButtonsActive: function () {},

  //
  // --init
  init: function () {
    this.emblaAutoSlide();
  },
};

export default embla;
