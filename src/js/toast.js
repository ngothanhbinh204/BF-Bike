const toast = {
  containerToast: $("#container-toast"),
  timeOut: 3000,

  toast: function (type, desc = "Tôi là toast.") {
    if (
      type !== "success" &&
      type !== "warning" &&
      type !== "error" &&
      type !== "message"
    )
      return;
    if (!this.containerToast.length)
      return console.error("Container toast not found!");
    const toastMap = {
      success: {
        icon: "fa-regular fa-check",
        title: this.getToastTitle("success"),
      },
      warning: {
        icon: "fa-regular fa-triangle-exclamation",
        title: this.getToastTitle("warning"),
      },
      error: {
        icon: "fa-regular fa-xmark",
        title: this.getToastTitle("error"),
      },
      message: {
        icon: "fa-regular fa-info",
        title: this.getToastTitle("message"),
      },
    };

    // toast html
    const $toastHtml = $(`
        <div class="toast toast-${type} show">
          <div class="toast-icon">
            <i class="${toastMap[type].icon}"></i>
          </div>
          <div class="toast-main-content">
            <div class="toast-title">${toastMap[type].title}</div>
            <div class="toast-desc">${desc}</div>
          </div>
          <button class="toast-action"><i class="fa-light fa-xmark"></i></button>
          <div class="toast-progress" style="animation-duration: ${this.timeOut}ms;"></div>
        </div>
        `);
    // append toast
    this.containerToast.append($toastHtml);

    // close timeout
    const toastTimeout = this.createToastTimer(this.timeOut, () => {
      this.removeToast($toastHtml);
    });
    toastTimeout.start();

    // hover pause toast animation
    this.hoverPauseToast($toastHtml, toastTimeout);

    // click close toast
    $toastHtml.find(".toast-action").on("click", () => {
      toastTimeout.stop();
      $toastHtml.off("mouseenter mouseleave");
      this.playAnimationToast($toastHtml);
      this.removeToast($toastHtml);
    });
  },

  // remove toast
  removeToast: function ($toastHtml) {
    if (!$toastHtml.hasClass("show")) return;
    $toastHtml.removeClass("show");
    // remove dom
    $toastHtml.one("animationend webkitAnimationEnd", function () {
      $(this).remove();
    });
  },

  // hover pause toast animation
  hoverPauseToast: function ($toastHtml, timer) {
    $toastHtml.on("mouseenter", () => {
      this.pauseAnimationToast($toastHtml);
      timer.pause();
    });
    $toastHtml.on("mouseleave", () => {
      this.playAnimationToast($toastHtml);
      timer.resume();
    });
  },

  // animation play state toast
  pauseAnimationToast: function ($toastHtml) {
    $toastHtml.css("animation-play-state", "paused");
    $toastHtml.find(".toast-progress").css("animation-play-state", "paused");
  },
  playAnimationToast: function ($toastHtml) {
    $toastHtml.css("animation-play-state", "running");
    $toastHtml.find(".toast-progress").css("animation-play-state", "running");
  },

  // timer
  createToastTimer: function (duration, onDone) {
    let timer = null;
    let startTime = 0;
    let remaining = duration;
    let isRunning = false;
    const start = () => {
      if (isRunning) return;
      isRunning = true;
      startTime = performance.now();
      timer = setTimeout(() => {
        isRunning = false;
        onDone();
      }, remaining);
    };
    const stop = () => {
      clearTimeout(timer);
      isRunning = false;
      remaining = 0;
    };
    const pause = () => {
      if (!isRunning) return;
      clearTimeout(timer);
      const elapsed = performance.now() - startTime;
      remaining = Math.max(0, remaining - elapsed);
      isRunning = false;
    };
    const resume = () => {
      if (isRunning) return;
      if (remaining <= 0) return onDone();
      start();
    };
    const reset = () => {
      clearTimeout(timer);
      remaining = duration;
      isRunning = false;
      start();
    };
    return { start, pause, resume, reset, stop };
  },

  // get title
  getToastTitle: function (type) {
    return typeof APP_CONFIG !== "undefined" && APP_CONFIG !== null
      ? APP_CONFIG.toast?.title?.[type] || "!!!"
      : "!!!";
  },

  //
  // --init
  init: function () {},
};

export default toast;
