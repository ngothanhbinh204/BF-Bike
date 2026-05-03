import Lenis from "@studio-freight/lenis";
import ScrollTrigger from "gsap/ScrollTrigger";

const lenis = {
  lenisInstance: null,
  lenisScrollCheck: ".lenis-scroll-check",

  // setting
  setting: function () {
    if (this.lenisInstance) return;
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });
    this.lenisInstance = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    this._rafId = rafId;
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) lenis.scrollTo(value);
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });
    ScrollTrigger.addEventListener("refresh", () => {
      lenis.resize();
    });
    ScrollTrigger.refresh();
  },

  // get
  getInstance: function () {
    return this.lenisInstance;
  },
  stop: function () {
    this.lenisInstance?.stop();
  },
  start: function () {
    this.lenisInstance?.start();
  },
  scrollTo: function (target, options) {
    this.lenisInstance?.scrollTo(target, options);
  },

  // auto check scroll lenis
  autoCheckScrollLenis: function () {
    const $scrollableItems = $(this.lenisScrollCheck);
    if (!$scrollableItems.length) return;
    $scrollableItems.each((i, el) => {
      const hasScroll = el.scrollHeight > el.clientHeight;
      if (hasScroll) {
        $(el).attr("data-lenis-prevent", "true");
      } else {
        $(el).removeAttr("data-lenis-prevent");
      }
    });
  },

  // init autoCheckScrollLenis
  initAutoCheckScrollLenis: function () {
    this.autoCheckScrollLenis();
    // check when the dmo change
    const observer = new MutationObserver((mutations, obs) => {
      const $scrollableItems = $(this.lenisScrollCheck);
      if (!$scrollableItems.length) return;
      this.autoCheckScrollLenis();
      obs.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // even resize
    let resizeDebound;
    $(window).on("resize", () => {
      clearTimeout(resizeDebound);
      resizeDebound = setTimeout(() => {
        this.autoCheckScrollLenis();
      }, 300);
    });
  },

  // --init
  init: function () {
    this.initAutoCheckScrollLenis();
    // init setting
    this.setting();
  },
};
export default lenis;
