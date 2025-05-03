/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    env: {
        BASE_API_URL: process.env.NODE_ENV === "development" ? "http://localhost:6100" : "https://api.ciratco.com",
        WEBSITE_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ciratco.com",
        USER_TOKEN_NAME_IN_LOCAL_STORAGE: "c-s-u-t",
        STORE_NAME: "Ciratco Store",
        USER_LANGUAGE_FIELD_NAME_IN_LOCAL_STORAGE: "ciratco-store-language",
        USER_ADDRESSES_FIELD_NAME_IN_LOCAL_STORAGE: "ciratco-customer-addresses",
        USER_CART_NAME_IN_LOCAL_STORAGE: "ciratco-store-customer-cart",
        USER_THEME_MODE_FIELD_NAME_IN_LOCAL_STORAGE: "ciratco-store-light-mode",
        REFERAL_WRITER_FIELD_NAME_IN_LOCAL_STORAGE: "ciratco-store-referal-writer-info",
        SELECTED_COUNTRY_BY_USER: "ciratco-store-country",
        CONTACT_NUMBER: "4915563191873",
        CONTACT_EMAIL: "info@ciratco.com",
        FACEBOOK_LINK: "https://www.facebook.com/ciratco?mibextid=kFxxJD",
        INSTAGRAM_LINK: "https://www.instagram.com/ciratco",
        TIKTOK_LINK: "https://www.tiktok.com/@cirat.co?_t=8oZFsy0KQ2z&_r=1",
        WEBSITE_NAME: "Ciratco",
        WEBSITE_DASHBOARD_URL: process.env.NODE_ENV === "development" ? "http://localhost:3001" : "https://dashboard.ciratco.com",
        MAIN_COLOR_ONE: "#1b405a",
        MAIN_COLOR_FIVE: "#000"
    },
    async headers() {
        return [
            {
                source: process.env.NODE_ENV === "development" ? "//localhost:6100/(.*)" : "//api.ciratco.com/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://ciratco.com",
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value:
                            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ]
            }
        ];
    }
}

module.exports = nextConfig;