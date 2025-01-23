declare const importMeta: {
    readonly env: {
        readonly VITE_RECAPTCHA_SITE_KEY: string;
        readonly VITE_API_URL: string;
    };
};

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
export const API_URL = import.meta.env.VITE_API_URL;
