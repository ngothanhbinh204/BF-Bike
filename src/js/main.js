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
import homePage from "./homePage";
import lazyload from "./lazyload";
$(document).ready(function () {
  lenis.init();
  header.init();
  helper.init();
  marquee.init();
  swiperInit();
  homePage.init();
  helper.countUpInit();
  initFancybox();
  paralaxInit(".paralax-wrap");
  helper.removeClassBody(".wrap-menu-mobile .modal-menu", "isOpenMenu");
  animation.init();
  initProductListUI();
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
lazyload.init();

function testToast() {
  let index = 0;
  const mapTypeToast = ["success", "error", "warning", "message"];
  $("#btn-toast").on("click", () => {
    toast.toast(mapTypeToast[index], "Hiện đang có lỗi nha mày!!!");
    index = (index + 1) % mapTypeToast.length;
  });
}

/*==================== Product List UI ====================*/
function initProductListUI() {
  if (!$(".section-product-list").length) return;

  // Sort dropdown — WP: maps to FacetWP sort widget or WC orderby
  $("[data-sort-dropdown]").each(function () {
    var $wrap = $(this);
    var $toggle = $wrap.find(".sort-dropdown__toggle");
    var $menu = $wrap.find(".sort-dropdown__menu");
    var $items = $wrap.find(".sort-dropdown__item");
    var $current = $wrap.find(".sort-dropdown__current");

    $toggle.on("click", function (e) {
      e.stopPropagation();
      var isOpen = $menu.hasClass("is-open");
      $("[data-sort-dropdown] .sort-dropdown__menu").removeClass("is-open");
      $("[data-sort-dropdown] .sort-dropdown__toggle").attr("aria-expanded", "false");
      if (!isOpen) {
        $menu.addClass("is-open");
        $toggle.attr("aria-expanded", "true");
      }
    });

    $items.on("click", function () {
      var label = $(this).text();
      var value = $(this).data("value");
      $current.text(label);
      $items.removeClass("is-selected");
      $(this).addClass("is-selected");
      $menu.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      // WP: trigger FacetWP sort — facetwp.hooks.doAction('facetwp/sort', value)
      $(document).trigger("product:sort", [value]);
    });

    $(document).on("click", function () {
      $menu.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
    });
  });

  // Filter group toggle (collapsible)
  $("[data-filter-group]").each(function () {
    var $group = $(this);
    var $toggle = $group.find(".filter-group__toggle");
    $toggle.on("click", function () {
      var expanded = $toggle.attr("aria-expanded") === "true";
      if (expanded) {
        $toggle.attr("aria-expanded", "false");
      } else {
        $toggle.attr("aria-expanded", "true");
      }
    });

  });

//   // Price range — update display value
//   $(".filter-price__range").on("input", function () {
//     var val = parseInt($(this).val());
//     var formatted = val.toLocaleString("vi-VN") + " đ";
//     $(this).closest(".filter-price").find(".filter-price__val.is-max").text(formatted);
//     var pct = ((val - this.min) / (this.max - this.min)) * 100;
//     $(this).css("background", "linear-gradient(to right, #D71920 0%, #D71920 " + pct + "%, #e5e7eb " + pct + "%)");
//   });
}
