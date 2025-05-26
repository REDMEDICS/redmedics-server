export default () => ({
    app: {
        name: process.env.APPNAME,
        version: process.env.APPVERSION,
        port: process.env.APP_PORT || 3000,
        domain: process.env.COOKIE_DOMAIN
    },
    mongo: {
        uri: process.env.MONGO_URI,
    },
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
        accessTokenExpiryInSeconds: parseInt(process.env.ACCESS_TOKEN_EXPIRY_IN_SECONDS || '0', 10),
        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
        refreshTokenExpiryInSeconds: parseInt(process.env.REFRESH_TOKEN_EXPIRY_IN_SECONDS || '0', 10),
    },
    // google: {
    //     cliendId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //     callbackUrl: process.env.GOOGLE_CALLBACK_URL
    // }
});
