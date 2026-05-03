import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
gsap.registerPlugin(SplitText, ScrollTrigger);
import lenis from "./lenis";

const animation = {
  //
  parallaxImgScroll: function () {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const $elAnimate = $("[data-parallax]");
      const extra = 5;
      const triggers = [];
      //
      $elAnimate.each(function () {
        const $this = $(this);
        const config = {
          yPercent: $this.attr("data-parallax-y") || 10,
        };
        const y = Number(config.yPercent);
        if (!Number.isFinite(y)) {
          console.error("err: incorrect data");
          return;
        }
        // applye style default
        gsap.set($this.find("[data-parallax-img]"), {
          top: `${-(y + extra)}%`,
          height: `${100 + (extra + y) * 2}%`,
        });

        // add animate
        const tween = gsap.fromTo(
          $this.find("[data-parallax-img]")[0],
          {
            yPercent: -y,
          },
          {
            yPercent: y,
            ease: "none",
            scrollTrigger: {
              trigger: $this[0],
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        triggers.push(tween);
      });

      // cleanup
      return () => {
        triggers.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        //
        $elAnimate.find("[data-parallax-img]").each(function () {
          gsap.set(this, { clearProps: "transform,top,height" });
        });
      };
    });
  },

  //   --
  buttonToTop: function () {
    let windowHeight = $(window).height();
    $(document).on("scroll", function () {
      let scrollTop = $(window).scrollTop();
      let documentHeight = $(document).height();
      if (scrollTop + windowHeight > documentHeight - windowHeight) {
        $(".button-to-top").addClass("active");
      } else {
        $(".button-to-top").removeClass("active");
      }
    });
    $(document).on("click", ".button-to-top", function () {
      lenis.scrollTo(0, {
        duration: 6,
      });
    });
  },

  //   --
  scrollTextRipper: function () {
    const $elAnimate = $("[data-ripple-text]");
    // loop

    $elAnimate.each(function () {
      const $this = $(this);

      // add el SEO

      //config
      const config = {
        stagger: Number($this.attr("data-ripple-text-delay")) || 0.06,
        duration: Number($this.attr("data-ripple-text-duration")) || 1,
        types: $this.attr("data-ripple-text-types") || "chars",
        start: $this.attr("data-ripple-text-start") || "start",
      };
      // if (
      //   (!Number.isFinite(stagger) && stagger <= 0) ||
      //   !Number.isFinite(duration) ||
      //   config.types !== "chars" ||
      //   config.types !== "lines"
      // ) {
      //   console.error("err:");
      //   return;
      // }
      const split = new SplitText($this[0], {
        type: config.types,
      });

      // set default css
      gsap.set(split[config.types], {
        willChange: "transform",
      });

      // add animation
      gsap.fromTo(
        split[config.types],
        {
          yPercent: 110,
          opacity: 0,
          scale: 0.3,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          duration: config.duration,
          ease: "power2.out",
          stagger: {
            each: config.stagger,
            from: config.start,
          },
          scrollTrigger: {
            trigger: $this[0],
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  },
  //   init
  init: function () {
    this.parallaxImgScroll();
    this.buttonToTop();
    this.scrollTextRipper();
  },
};

export default animation;
