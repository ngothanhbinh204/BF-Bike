import AOS from "aos";
import lozad from "lozad";
import helper from "./helper";
import header from "./header";
import { swiperInit } from "./swiper";
import { paralaxInit } from "./paralax";
import lenis from "./lenis";
import animation from "./animationGlobal";
import initFancybox from "./fancybox";
import marquee from "./marquee";
import toast from "./toast";

$(document).ready(function () {
  lenis.init();
  header.init();
  helper.init();
  marquee.init();
  swiperInit();
  initFancybox();
  paralaxInit(".paralax-wrap");
  helper.removeClassBody(".wrap-menu-mobile .modal-menu", "isOpenMenu");
  animation.init();
  // console.log(toast.getToastTitle("error"));
  // refresh AOS
  testToast();
  setTimeout(() => {
    AOS.refresh();
  }, 1000);
});

/*==================== Aos Init ====================*/
AOS.init({
  offset: 100,
});

/*==================== Lazyload JS ====================*/
const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

window.lozad = observer.observe();

function testToast() {
  let index = 0;
  const mapTypeToast = ["success", "error", "warning", "message"];
  $("#btn-toast").on("click", () => {
    toast.toast(mapTypeToast[index], "Hiện đang có lỗi nha mày!!!");
    index = (index + 1) % mapTypeToast.length;
  });
}
