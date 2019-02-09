const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/prof-simple-todos-btam', {
    logging: false
});

const Todo = conn.define('task', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const syncAndSeed = () => {
    conn.sync({ force: true })
        .then(() => {
            Promise.all([
                Todo.create({ name: 'models' }),
                Todo.create({ name: 'routes' }),
                Todo.create({ name: 'React' })
            ])
        })
}

module.exports = {
    models: {
        Todo
    },
    syncAndSeed
}