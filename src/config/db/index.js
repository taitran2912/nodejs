const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/education');
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure: ', error);
    }
}

module.exports = { connect };
