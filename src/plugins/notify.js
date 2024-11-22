import {Notify} from "quasar";

export const triggerWarning = () => {
  Notify.create({
    message: 'Please enter at least 5 characters',
    color: 'negative',
    position: 'top',
  });
};
export const triggerNegative = function (opts = {}) {
  Notify.create({
    ...{
      type: 'negative',
      message: 'Oops! Something went wrong',
      position: 'center'
    }, ...opts
  });
}
