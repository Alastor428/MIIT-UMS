export default () => ({
    jwt: {

        secret: process.env.SECRET_KEY || 'default-secret',
    },
    database: {

        user_db: process.env.DB_URL || 'mongodb://127.0.0.1:27017/User',
    },

    port: process.env.PORT
});