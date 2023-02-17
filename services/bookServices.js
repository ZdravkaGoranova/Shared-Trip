const Trip = require('../models/Trip.js');

const bookUtils = require('../utils/bookUtils.js');

exports.search = async (name, paymentMethod) => {

    let cprypto = await this.getAll();

    if (name) {
        cprypto = cprypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if (paymentMethod) {
        cprypto = cprypto.filter(x => x.paymentMethod == paymentMethod)
    }
    return cprypto;
};

exports.getAll = () => Trip.find({}).lean();

exports.create = (ownerId, cryptoData) => Trip.create({ ...cryptoData, owner: ownerId });

exports.getOne = (bookId) => Trip.findById(bookId).lean();

exports.update = (bookId, data) => Trip.findByIdAndUpdate(bookId, data, { runValidators: true });

exports.delete = (bookId) => Trip.findByIdAndDelete(bookId);


exports.getMyWishTrip = (userId) => Trip.find({ wishingList: userId}).lean();



exports.wish = async (userId, bookId, req, res) => {
    const book = await Trip.findById(bookId);
    const isOwner = book.owner == req.user._id;
    const isWish  = book.wishingList?.some(id => id == req.user?._id);

    if (isOwner) {
        return res.render('home/404');
        //throw new Error ('You is Owner')
    }
    if (isWish) {
        return res.render('home/404');
        // throw new Error ('You already bought these crypto coins.')
    }

    book.wishingList.push(userId);
    return await book.save();
    //console.log(crypto.buyers)
    //или Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })
};

   

//     const isWish  = book.wishingList?.filter(id => id == req.user?._id);