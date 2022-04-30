import { toast } from "react-toastify";

export const openSuccessToaster = ({message = "Demo Message"})=>{
  toast.success(message, {
    autoClose: 5000,
  });
}

export const openErrorToaster = ({message = "Demo Message"})=>{
  toast.error(message, {
    autoClose: 5000,
  });
}

export const openInfoToaster = ({message = "Demo Message"})=>{
  toast.info(message, {
    autoClose: 5000,
  });
}
export const openWarningToaster = ({message = "Demo Message"})=>{
  toast.warning(message, {
    autoClose: 5000,
  });
}
