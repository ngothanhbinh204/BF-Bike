import lenis from "./lenis";

export default function initFancybox() {
  Fancybox.bind("[data-fancybox]", {
    on: {
      ready: () => lenis.stop(),
      closing: () => lenis.start(),
    },
  });
}
