const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    startPoint: {
        type: String,
         minLength: [4, 'Title should be at least two characters!'],
        required: true,

    },
    endPoint: {
        type: String,
        required: true,
        minLength: [4, 'Title should be at least two characters!'],

    },
    date: {
        type: String,
        // match: [/^http[s]?:\/\//, 'Invalid URL'],
        required: true,

    },
    time: {
        type: String,
        // minLength: [10, 'Title should be at least two characters!'],
        required: true,

    },
    image: {
        type: String,
        required: true,
        match: [/^http[s]?:\/\//, 'Invalid URL'],
    
    },
    brand: {

        type: String,
        required: true,
        minLength: [4, 'Title should be at least two characters!'],

        //     type: Number,
        //     min: 1,
        //     max: 5,
        //     required: true,
    },

    seats: {
        type: Number,
            min: 0,
            max: 4,
        required: true,
    },
    price: {
        type: Number,
            min: 1,
            max: 50,
        required: true,

    },
    description: {
        type: String,
        required: true,
         minLength: [10, 'Title should be at least two characters!'],

    },
    creator : {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    buddies : [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    //или
    // buyers: {
    //     type: [mongoose.Types.ObjectId],
    //     default: [],
    //     ref: 'User'
    // },

});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;