import toast from "./toast";

const form = {
  outputValidatorForm: ".wpcf7-response-output",

  validatorFormToast: function () {
    // wpcf7mailsent
    $(document).on("wpcf7submit", (e) => {
      const { status, apiResponse } = e.originalEvent.detail;
      const msg = apiResponse.message;
      // check status form
      if (status === "mail_sent") {
        toast.toast("success", msg);
      } else if (status === "validation_failed") {
        toast.toast("warning", msg);
      } else if (status === "mail_failed") {
        toast.toast("error", msg);
      } else if (status === "spam") {
        toast.toast("warning", msg);
      } else {
        toast.toast("error", msg);
      }
    });
  },

  // --init
  init: function () {
    this.validatorFormToast();
  },
};

export default form;
