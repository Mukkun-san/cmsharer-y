import { toast } from "react-toastify";

function toastError(msg, position) {
  if (!position) {
    position = "top-center";
  }
  toast.error(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function toastWarning(msg, position) {
  if (!position) {
    position = "top-center";
  }
  toast.warning(msg, {
    position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

function toastSuccess(msg, position) {
  if (!position) {
    position = "top-center";
  }
  toast.success(msg, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export { toastError, toastSuccess, toastWarning };
