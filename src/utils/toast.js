import toast from "react-hot-toast";

/**
 * @param {boolean} type
 * @param {string} message
 */

const toast = (message, type) => {
  if (type === true) {
    toast.success(message);
  } else if (type === false) {
    toast.error(message);
  }
};
export default toast;
