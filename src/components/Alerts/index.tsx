import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastOptions, UpdateOptions } from 'react-toastify';

const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
}

const Alerts = {
    info: (text: string) => toast.info(text, options),
    success: (text: string) => toast.success(text, options),
    error: (text: string) => toast.error(text, options),
    warning: (text: string) => toast.warning(text, options),
    loading: (text: string) => toast.loading(text, options),
    update: (toatsId: React.ReactText, optionsUpdate?: UpdateOptions) => toast.update(toatsId, optionsUpdate),
}

export default Alerts;