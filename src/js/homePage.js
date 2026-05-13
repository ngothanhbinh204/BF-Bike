const homePage = {
  init() {
    this.initBannerControl();
    this.initPostFilter();
  },

  initBannerControl() {
    var banner = document.querySelector(".section-home-banner");
    if (!banner) return;

    var swiperEl = banner.querySelector(".swiper");
    var $fill = $(banner).find(".banner-progress-fill");
    var $btn = $(banner).find(".banner-play-pause");
    if (!$fill.length || !$btn.length) return;

    // Swiper is created synchronously by swiperInit() before this runs
    if (!swiperEl || !swiperEl.swiper) return;

    var swiper = swiperEl.swiper;
    var delay =
      swiper.params.autoplay && swiper.params.autoplay.delay
        ? swiper.params.autoplay.delay
        : 3500;
    var isPlaying = true;

    function startProgress() {
      // Reset without transition, then animate with transition over delay
      $fill.css({ transition: "none", width: "0%" });
      $fill[0].offsetWidth; // force reflow so reset takes effect
      $fill.css({ transition: "width " + delay + "ms linear", width: "100%" });
    }

    // Start on load
    startProgress();

    // Restart on every slide change
    swiper.on("slideChange", function () {
      startProgress();
    });

    // Play / Pause toggle
    $btn.on("click", function () {
      if (isPlaying) {
        // Freeze progress at current pixel position
        var trackW = $(banner).find(".banner-progress-track")[0]
          .getBoundingClientRect().width;
        var fillW = $fill[0].getBoundingClientRect().width;
        var pct = trackW > 0 ? (fillW / trackW) * 100 : 0;
        $fill.css({ transition: "none", width: pct + "%" });
        swiper.autoplay.stop();
        $btn.find("i").removeClass("fa-pause").addClass("fa-play");
      } else {
        swiper.autoplay.start();
        startProgress();
        $btn.find("i").removeClass("fa-play").addClass("fa-pause");
      }
      isPlaying = !isPlaying;
    });
  },

  
  initPostFilter() {
    var $section = $(".section-posts");
    if (!$section.length) return;

    var $tabs = $section.find(".filter-btn");
    var swiperEl = $section.find(".swiper-posts")[0];

    // Cache all original slides before any filter runs
    var $allSlides = $section.find(".swiper-posts .swiper-wrapper .swiper-slide").clone(true);

    $tabs.on("click", function () {
      var filter = $(this).data("filter");

      $tabs.removeClass("is-active");
      $(this).addClass("is-active");

      var $wrapper = $section.find(".swiper-posts .swiper-wrapper");
      $wrapper.empty();

      $allSlides.each(function () {
        if (filter === "all" || $(this).data("category") === filter) {
          $wrapper.append($(this).clone(true));
        }
      });

      // Re-init lazy loading for newly inserted images
      if (window.lozad) {
        var observer = lozad(".lozad");
        observer.observe();
      }

      // Update Swiper after DOM change
      if (swiperEl && swiperEl.swiper) {
        swiperEl.swiper.slideTo(0, 0);
        swiperEl.swiper.update();
      }
    });
  },
};



export default homePage;
