import { CountUp } from "countup.js";

const helper = {
  // media
  mediaScreen: function (breakpoint, callback) {
    const breakpointMap = {
      min: {
        xl: "1200px",
        lg: "1024px",
        md: "768px",
        sm: "576px",
        xs: "410px",
      },
      max: {
        "-xl": "1199.98px",
        "-lg": "1023.98px",
        "-md": "767.98px",
        "-sm": "575.98px",
        "-xs": "409.98px",
      },
    };
    //
    const isMax = breakpoint.startsWith("-");
    const queryValue = isMax
      ? breakpointMap.max[breakpoint]
      : breakpointMap.min[breakpoint];
    if (!queryValue) return;
    const query = `(${isMax ? "max-width" : "min-width"}: ${queryValue})`;
    const mq = window.matchMedia(query);
    const handler = (e) => {
      typeof callback === "function" && callback(e.matches);
    };
    // init
    handler(mq);
    // even
    mq.addEventListener("change", handler);
    // cleanup
    return () => mq.removeEventListener("change", handler);
  },

  setBackgroundElement: function () {
    $("[data-background]").each(function () {
      var background = $(this).data("background");
      $(this).css({
        "background-image": "url(" + background + ")",
        "background-size": "cover",
        "background-position": "center center",
      });
    });
  },

  handleClassBody: function (elSelector, className, options = {}) {
    const {
      type = "toggle",
      closeOnEsc = true,
      closeOnOutside = false,
      activeClass = "is-active",
    } = options;
    const $trigger = $(elSelector);
    if (!$trigger.length || !className) return;
    $trigger.off("click.body").on("click.body", function (e) {
      e.stopPropagation();
      const $btn = $(this);
      if (type === "add") {
        $("body").addClass(className);
        $btn.addClass(activeClass);
      } else if (type === "remove") {
        $("body").removeClass(className);
        $btn.removeClass(activeClass);
      } else {
        $("body").toggleClass(className);
        $btn.toggleClass(activeClass);
      }
    });
    if (closeOnEsc) {
      $(document).on(`keydown.body.${className}`, function (e) {
        if (e.key === "Escape") {
          $("body").removeClass(className);
          $trigger.removeClass(activeClass);
        }
      });
    }

    if (closeOnOutside) {
      $(document).on(`click.body.${className}`, function () {
        $("body").removeClass(className);
        $trigger.removeClass(activeClass);
      });
    }
  },
  //--
  handlePopup: function () {
    let arrStatus = [];
    const $popups = $("[data-popup-name]");
    // open
    const openPopup = (name) => {
      if (!name) return;
      const $target = $(`[data-popup-name="${name}"]`);
      if ($target.hasClass("isOpen")) return;
      $target.addClass("isOpen");
      arrStatus.push($target);
    };
    // close
    const closePopup = (el) => {
      if (!el) return;
      const $popup = $(el).closest("[data-popup-name]");
      if (!$popup.length) return;
      $popup.removeClass("isOpen");
      arrStatus = arrStatus.filter((p) => p[0] !== $popup[0]);
    };

    // event
    $popups.on("click", function (e) {
      const type = $(this).data("popup-type");
      if (type && type !== "modal") return;
      if (e.target !== this) return;
      closePopup(this);
    });
    $("[data-popup-close]").on("click", function () {
      closePopup(this);
    });
    $("[data-popup]").on("click", function () {
      const namePopup = $(this).data("popup");
      openPopup(namePopup);
    });
    // esc
    $(document).on("keydown", function (e) {
      if (e.key !== "Escape") return;
      const $last = arrStatus[arrStatus.length - 1];
      if (!$last.length) return;
      closePopup($last[0]);
    });
  },
  //--
  detectCloseElement: function (ele, ele2, funcRemove) {
    $(document).on("click", function (e) {
      if (!$(e.target).closest(ele).length && !$(e.target).hasClass(ele2)) {
        funcRemove();
      }
    });
    // esc
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        funcRemove();
      }
    });
  },
  //--

  //--
  removeClassBody: function (elSelector, classRm) {
    const elEvent = $(elSelector);
    if (!elEvent.length || !classRm) return;
    // evemnt
    elEvent.off("click.removeBody").on("click.removeBody", function () {
      $("body").removeClass(classRm);
    });
    $(document)
      .off("keydown.removeBody")
      .on("keydown.removeBody", function (e) {
        if (e.key === "Escape") {
          $("body").removeClass(classRm);
        }
      });
  },

  //--
  toggleItem: function () {
    const nodeParent = $(".wrap-toggle-menu");
    nodeParent.each(function () {
      const wrap = $(this);
      const items = wrap.children(".item-toggle");
      const titles = items.children(".title");
      const keepInit = wrap.hasClass("keep-open-init");
      if (wrap.hasClass("auto-active-first")) {
        titles.removeClass("active");
        items.first().children(".title").addClass("active");
      }
      if (!keepInit) {
        titles.each(function () {
          const title = $(this);
          const parent = title.parent();
          const content = parent.find(".dropdown-content");
          if (!content.length) {
            parent.addClass("no-next");
            return;
          }

          title.hasClass("active") ? content.show() : content.hide();
        });
      }
      titles.on("click", function (e) {
        e.stopPropagation();
        const title = $(this);
        const parent = title.parent();
        const content = parent.find(".dropdown-content");
        if (!content.length) return;

        if (!wrap.hasClass("no-close-others")) {
          parent
            .siblings(".item-toggle")
            .children(".title.active")
            .removeClass("active");

          parent.siblings(".item-toggle").find(".dropdown-content").slideUp();
        }
        title.toggleClass("active");
        content.slideToggle();
      });
    });
  },

  // --
  //--
  funcExpandContent: function (listNode) {
    const { parent, children, item, button, initItem, gap = 0 } = listNode;
    if (!$(parent).length) return;
    let itemHeight = $(item).outerHeight();
    let gapCalculate = gap
      ? Number($(parent).find(children).css("column-gap").slice(0, -2)) * gap
      : 0;
    let initHeight = itemHeight * initItem + gapCalculate;
    let originalHeight = $(parent).find(children).outerHeight();
    if (originalHeight < initHeight) {
      $(button).remove();
    } else {
      $(parent).css("height", initHeight);
    }
    $(button).on("click", function () {
      if ($(this).hasClass("expand")) {
        $(parent).css("height", initHeight);
        $(this).find("span").text("Xem thêm");
      } else {
        $(parent).css("height", originalHeight);
        // setTimeout(() => {
        // 	$(parent).css("height", "auto");
        // }, 1000);
        $(this).find("span").text("Rút gọn");
      }
      $(this).toggleClass("expand");
    });
  },
  //--
  clickScrollToDiv: function (nodeEle, heightSpacing = () => {}) {
    $(nodeEle).on("click", function (event) {
      let height = 0;
      $(this).addClass("active").siblings().removeClass("active");
      if (heightSpacing) {
        height = heightSpacing();
      } else {
        height = 0;
      }
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top - height,
          },
          800,
        );
      }
    });
  },
  //--
  appendCaptchaASP: function () {
    if (!$("#ctl00_mainContent_ctl01_pnlFormWizard").length) return;
    // Select the div element you want to observe
    const myDiv = document.querySelector(
      "#ctl00_mainContent_ctl01_pnlFormWizard",
    );
    // Create a new MutationObserver object
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        console.log("Run");
        appendCaptcha();
      });
    });
    const config = { attributes: true, characterData: true, childList: true };
    observer.observe(myDiv, config);
    function appendCaptcha() {
      $(".form-group.frm-captcha").appendTo(".wrap-form-submit");
      $(".form-group.frm-btnwrap").appendTo(".wrap-form-submit");
    }
    appendCaptcha();
  },
  //--
  replaceSvgImages: function (callback) {
    const $imgs = $(".js-inline-svg");
    const total = $imgs.length;

    if (!total) {
      callback && callback();
      return;
    }

    let done = 0;

    $imgs.each(function () {
      const $img = $(this);
      const imgURL = $img.attr("src");
      const imgClass = $img.attr("class");

      if (!imgURL || !imgURL.toLowerCase().endsWith(".svg")) {
        done++;
        if (done === total && callback) callback();
        return;
      }

      $.ajax({
        url: imgURL,
        dataType: "text",
        success: function (svgContent) {
          const $svgDiv = $("<div>").html(svgContent);
          const $svg = $svgDiv.find("svg");

          if (imgClass) {
            $svg.addClass(imgClass);
          }
          $img.replaceWith($svg);
          done++;
          if (done === total && typeof callback === "function") {
            callback();
          }
        },
        error: function (error) {
          console.error("Error fetching SVG:", error);
          done++;
          if (done === total && typeof callback === "function") {
            callback();
          }
        },
      });
    });
  },
  //--
  indicatorSlide: function () {
    if ($(".indicator-swipe").length > 0) {
      var callback = function (entries) {
        entries.forEach(function (entry) {
          const timeOut = entry.target.dataset.timeout || 3000;
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            setTimeout(function () {
              entry.target.classList.remove("active");
            }, timeOut);
          }
        });
      };
      var observer = new IntersectionObserver(callback);
      var animationItems = document.querySelectorAll(".indicator-swipe");
      animationItems.forEach(function (item) {
        observer.observe(item);
      });
    }
  },
  //--
  countUpInit: function () {
    const countUpElements2 = $("[data-countup]");
    let instants = [];
    countUpElements2.each(function () {
      const $this = $(this);
      const targetNumber = $this.data("countup");
      const is_decimal = targetNumber?.includes(".");
      const instant = new CountUp($this[0], targetNumber, {
        duration: 4,
        separator: ".",
        decimal: ",",
        enableScrollSpy: true,
        decimalPlaces: is_decimal ? 2 : 0,
      });
      if (!instant.error) {
        instant.start();
        instants.push(instant);
      } else {
        console.error(instant.error);
      }
    });
    return {
      reset: () => {
        instants.forEach((item) => {
          item.reset();
        });
      },
      start: () => {
        instants.forEach((item) => {
          item.start();
        });
      },
    };
  },
  //--
  stickElementToEdge: function () {
    var target = $("[data-stick-to-edge]");
    target.each(function () {
      const $this = $(this);
      const edgePosition = $this.attr("data-edge-placement")
        ? "inner"
        : "screen";
      const position = $this.attr("data-stick-to-edge");
      const unstick = parseInt($this.attr("data-unstick-min"), 10) || 1200;
      let offset = ($(window).width() - $(".default-container-js").width()) / 2;
      if (edgePosition === "inner") {
        if (
          $this.closest(".container").length &&
          $this.closest(".container").closest(".container-fluid").length
        ) {
          const newOffset = Math.abs(
            $(".wide-container-js").offset().left -
              $(".default-container-js").offset().left,
          );
          offset = newOffset;
        }
      }
      if (position === "left") {
        $this.css({
          "margin-left": `-${offset}px`,
          "--ml-stick": `${Math.abs(offset)}`,
        });
      }
      if (position === "right") {
        $this.css({
          "margin-right": `-${offset}px`,
          "--mr-stick": `${Math.abs(offset)}`,
        });
      }
      if ($(window).width() < unstick) {
        $this.removeAttr("style");
        $this.css({
          "--ml-stick": "0",
          "--mr-stick": "0",
        });
      }
    });
  },
  //--
  menuSpy: function () {
    const $containers = $("[data-menu-spy-container]");
    if (!$containers.length) return;
    $containers.each(function () {
      let debounceTimer;
      const $container = $(this);
      const menuEl = $container.find("[data-menu-spy]")[0];
      if (!menuEl) return;
      new MenuSpy(menuEl, {
        activeClass: "active",
        threshold: 300,
        callback: function (currentItem) {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(function () {
            $container.scrollTo("li.active", 800);
          }, 1000);
        },
      });
    });
  },
  //--
  // init
  init: function () {
    this.setBackgroundElement();
    this.handlePopup();
    this.toggleItem();
    this.stickElementToEdge();
    this.menuSpy();
  },
};

export default helper;
