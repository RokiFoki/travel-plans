const config = {
    PORT: process.env.PORT || 3000,
    database: {
        user: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        database: process.env.DATABASE || 'travel_plans'
    },
    type: process.env.DATABASE_USER || 'development'
}

export default config;