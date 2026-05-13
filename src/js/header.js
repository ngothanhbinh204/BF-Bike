/*==================== Header ====================*/
/**
 * @param header
 */
const vw = $(window).width();
const header = {
  scrollActiveHeader: function () {
    const $elH = $("header");

    let height = $elH.height();
    if ($(window).scrollTop() > height) {
      $("header").addClass("active");
    } else {
      $("header").removeClass("active");
    }
  },
  headerHamburger: function () {
    $(".header-hamburger").on("click", function () {
      $(this).toggleClass("active");
      $("body").toggleClass("isOpenMenu");
    });
    // Close button inside mobile panel
    $(".mm-close").on("click", function () {
      $("body").removeClass("isOpenMenu");
      $(".header-hamburger").removeClass("active");
    });
    // Sub-menu accordion
    $(".mm-toggle").on("click", function () {
      var $toggle = $(this);
      var $sub = $toggle.closest("li").find(".mm-sub").first();
      var isActive = $toggle.hasClass("active");
      // collapse all others
      $(".mm-toggle.active").not($toggle).removeClass("active");
      $(".mm-nav .mm-sub").not($sub).slideUp(250);
      // toggle current
      $toggle.toggleClass("active", !isActive);
      if (isActive) {
        $sub.slideUp(250);
      } else {
        $sub.slideDown(250);
      }
    });
  },
  initVariable: function () {
    const height = $("header").height();
    document.documentElement.style.setProperty(
      "--header-height",
      `${height}px`,
    );
  },
  headerSearch: function () {
    function closeSearch() {
      $(".header-search-form").removeClass("active");
      $(".header-search").removeClass("active");
      $("body").removeClass("disable");
    }
    $(".header-search").on("click", function () {
      $(".header-search-form").addClass("active");
      $("body").addClass("disable");
      setTimeout(() => {
        $(".header-search-form .searchinput").focus();
      }, 400);
    });
    $(".header-search-form .close").on("click", function () {
      closeSearch();
    });
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        closeSearch();
      }
    });
    $(document).on("click", function (e) {
      if ($(".header-search-form").hasClass("active")) {
        if (
          !$(e.target).closest(".productsearchbox").length &&
          !$(e.target).is(".header-search") &&
          !$(e.target).closest(".header-search").length
        ) {
          closeSearch();
        }
      }
    });
  },
  init: function () {
    this.headerSearch();
    this.scrollActiveHeader();
    this.headerHamburger();
    this.initVariable();
    document.addEventListener("scroll", () => {
      this.scrollActiveHeader();
    });
  },
};

export default header;
