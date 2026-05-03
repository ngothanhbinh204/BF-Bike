import EmblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";

const marquee = {
  marqueeEl: ".marquee",
  marqueeViewEl: ".marquee-viewport",

  // setting
  setting: function () {
    const bind = this;
    $(this.marqueeEl).each(function () {
      const $el = $(this);
      // config
      const config = {
        speed: $el.data("speed") || 2,
        startDelay: $el.data("startDelay") || 1000,
        stopOnInteraction: $el.hasClass("marquee-stopOnInteraction"),
        loop: $el.hasClass("marquee-loop") || true,
        stopOnMouseEnter: $el.hasClass("marquee-stopOnMouseEnter"),
        axis: $el.data("axis") || "x",
        direction: $el.hasClass("marquee-reverse"),
        align: $el.data("align") || "start",
      };
      const $marqueeView = $el.find(bind.marqueeViewEl);
      // new embla
      const emblaApi = EmblaCarousel(
        $marqueeView[0],
        {
          loop: config.loop,
          axis: config.axis,
          align: config.align,
        },
        [
          AutoScroll({
            speed: config.speed,
            startDelay: config.startDelay,
            stopOnInteraction: config.stopOnInteraction,
            stopOnMouseEnter: config.stopOnMouseEnter,
            direction: !config.direction ? "forward" : "backward",
          }),
        ],
      );
    });
  },

  // marquee navigation
  marqueeNavigation: function () {},

  // --init
  init: function () {
    this.setting();
  },
};

export default marquee;
