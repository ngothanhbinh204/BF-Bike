import Swiper from "swiper";
import {
  Autoplay,
  Grid,
  Mousewheel,
  Navigation,
  Pagination,
  EffectFade,
  Thumbs,
} from "swiper/modules";

/**
 * @param swiperInit
 */
export function swiperInit() {
  $(".swiper-column-auto").each(function (index) {
    const $this = $(this);
    // Configuration flagsvideoSetting
    const config = {
      loop: $this.hasClass("swiper-loop"),
      touchMove: $this.hasClass("allow-touchMove") || true,
      mouseWheel: $this.hasClass("allow-mouseWheel")
        ? { forceToAxis: true }
        : false,
      autoHeight: $this.hasClass("auto-height"),
      hasVideo: $this.hasClass("auto-detect-video"),
      paginationType: $this.attr("data-pagination-type") || "bullets",
      time: $this.attr("data-time") || 3500,
      autoplay: $this.hasClass("autoplay"),
    };

    // Add unique identifier class
    $this.addClass(`swiper-column-auto-id-${index}`);

    // Create swiper with optimized options
    new Swiper(`.swiper-column-auto-id-${index} .swiper`, {
      modules: [Navigation, Pagination, Mousewheel],
      speed: 650,
      observer: true,
      observeParents: true,
      spaceBetween: 0,
      loop: config.loop,
      ...(config.autoplay && {
        autoplay: {
          delay: config.time,
        },
      }),
      slidesPerView: "auto",
      pagination: {
        el: `.swiper-column-auto-id-${index} .swiper-pagination`,
        clickable: true,
        ...(config.paginationType && {
          type: config.paginationType,
        }),
      },
      mousewheel: config.mouseWheel,
      allowTouchMove: config.touchMove,
      navigation: {
        prevEl: `.swiper-column-auto-id-${index} .btn-swiper-prev`,
        nextEl: `.swiper-column-auto-id-${index} .btn-swiper-next`,
      },
      watchSlidesProgress: true,
      autoHeight: config.autoHeight,
      // on: {
      //   init: function () {},
      //   slideChange: function () {},
      // },
    });
  });

  new Swiper(".section-home-banner .swiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    effect: "fade",
    autoplay: {
      delay: 3500,
    },
    modules: [Pagination, Navigation, Autoplay, EffectFade],
    pagination: {
      el: ".section-home-banner .swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        const slide = this.slides[index];
        const title = slide.getAttribute("data-title") || `Slide ${index + 1}`;
        return `<span class="${className}">${title}</span>`;
      },
    },
    navigation: {
      nextEl: ".section-home-banner .btn-swiper-next",
      prevEl: ".section-home-banner .btn-swiper-prev",
    },
  });

  if ($(".swiper-products").length) {
    new Swiper(".swiper-products", {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 16,
      speed: 600,
      navigation: {
        nextEl: ".section-products .btn-swiper-next",
        prevEl: ".section-products .btn-swiper-prev",
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 40 },
      },
    });
  }

  if ($(".swiper-posts").length) {
    new Swiper(".swiper-posts", {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 16,
      speed: 600,
      navigation: {
        nextEl: ".section-posts .btn-swiper-next",
        prevEl: ".section-posts .btn-swiper-prev",
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 40 },
      },
    });
  }

  // ─── Product Detail: Gallery with Thumbs ─────────────────────────────────
  if ($("[data-gallery-thumbs]").length) {
    let thumbsSwiper, mainSwiper;

    function initGallery() {
      const isDesktop = window.innerWidth >= 1024;

      if (thumbsSwiper) thumbsSwiper.destroy(true, true);
      if (mainSwiper) mainSwiper.destroy(true, true);

      thumbsSwiper = new Swiper("[data-gallery-thumbs]", {
        modules: [Navigation],
        direction: isDesktop ? "vertical" : "horizontal",
        slidesPerView: 5,
        spaceBetween: isDesktop ? 12 : 8,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        speed: 400,
        on: {
          click: function (swiper) {
            const clickedIndex = swiper.clickedIndex;
            if (clickedIndex === undefined || clickedIndex === null) return;

            const visibleIndexes = swiper.visibleSlidesIndexes;
            if (!visibleIndexes || !visibleIndexes.length) return;

            const firstVisible = visibleIndexes[0];
            const lastVisible = visibleIndexes[visibleIndexes.length - 1];
            if (clickedIndex >= lastVisible) {
              swiper.slideNext();
            } else if (clickedIndex <= firstVisible) {
              swiper.slidePrev();
            }
          },
        },
      });

      mainSwiper = new Swiper("[data-gallery-main]", {
        modules: [Navigation, Thumbs],
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 400,
        thumbs: {
          swiper: thumbsSwiper,
        },
        navigation: {
          prevEl: ".btn-product-prev",
          nextEl: ".btn-product-next",
        },
        on: {
          slideChange: function () {
            const activeIndex = this.activeIndex;
            const activeThumb = $(
              `[data-gallery-thumbs] .swiper-slide:nth-child(${activeIndex + 1})`
            );

            if (activeThumb.length && !activeThumb.hasClass("swiper-slide-visible")) {
              this.thumbs.swiper.slideTo(activeIndex);
            }
          },
        },
      });
      
    }

    initGallery();

    let galleryResizeTimer;
    $(window).on("resize.gallery", function () {
      clearTimeout(galleryResizeTimer);
      galleryResizeTimer = setTimeout(initGallery, 200);
    });
  }

  // ─── Product Detail: Video Guide ─────────────────────────────────────────
  if ($(".swiper-video-guide").length) {
    new Swiper(".swiper-video-guide", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      navigation: {
        prevEl: ".btn-video-prev",
        nextEl: ".btn-video-next",
      },
    });
  }

  // ─── Product Detail: Related Products ────────────────────────────────────
  if ($(".swiper-related").length) {
    new Swiper(".swiper-related", {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 16,
      speed: 600,
      navigation: {
        prevEl: ".btn-related-prev",
        nextEl: ".btn-related-next",
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1200: { slidesPerView: 4, spaceBetween: 32 },
      },
    });
  }
}
