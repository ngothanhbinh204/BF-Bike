import lozad from "lozad";

let observer = null;
let mutationObserver = null;

/**
 * Khởi tạo lozad lazy-load observer.
 * Sau khi init, observer được expose ra window.lozadObserver
 * để các module khác (productGallery, v.v.) gọi lại observe() khi DOM thay đổi.
 * MutationObserver tự động detect element .lozad mới được inject vào DOM
 * (ví dụ: WordPress AJAX load more) và trigger observe() mà không cần gọi tay.
 */
function initLazyload() {
  observer = lozad();
  observer.observe();

  // Expose ra window để WooCommerce / template PHP gọi được
  window.lozadObserver = observer;

  // Tự động re-observe khi DOM có thêm element .lozad mới (AJAX inject)
  mutationObserver = new MutationObserver(function (mutations) {
    var hasNewLozad = mutations.some(function (mutation) {
      return Array.from(mutation.addedNodes).some(function (node) {
        if (node.nodeType !== 1) return false;
        return (
          node.classList.contains("lozad") ||
          node.querySelector(".lozad") !== null
        );
      });
    });

    if (hasNewLozad) {
      observer.observe();
    }
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}


function refreshLazyload() {
  if (observer) {
    observer.observe();
  }
}

const lazyload = {
  init: initLazyload,
  refresh: refreshLazyload,
};

export default lazyload;

// Expose helpers ra window để WordPress theme/plugin PHP gọi được
window.refreshLazyload = refreshLazyload;
