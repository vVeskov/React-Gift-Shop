const Gift = require('../models/Gift');
const Orders = require('../models/Order');
module.exports = {

  getGifts: (req, res) => {
    Gift.find()
      .then((gifts) => {
        res
          .status(200)
          .json({ message: 'Fetched gifts successfully.', gifts });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  getUserOrders: (req, res) => {
    Orders.find().then((order) => {
      res.status(200)
        .json({ message: "User orders fetched successfully.", order })
    })
      .catch((error) => {
        // if (!error.statusCode) {
        //   error.statusCode = 500;
        // }
        next(error);
      })
  },


  createGift: (req, res) => {
    const giftObj = req.body;
    Gift.create(giftObj)
      .then((gift) => {
        res.status(200)
          .json({
            message: 'Gift created successfully!',
            gift
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },

  addNewOrderToUser: (req, res) => {
    const orderObj = req.body;
    Orders.create(orderObj)
      .then((order) => {
        res.status(200).json({
          message: "Gift added to cart successfully!",
          order
        })
      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      })
  },
  // TO DO !!!
  deleteSingleGift: (req, res) => {
    let user = req.body.user;
    let productName = req.body.productName;
    Orders.deleteMany({
      user: user,
      productName: { $in: [productName] }
    }).then(() => {
      res.status(200).json({
        message: 'You`ve deleted the choosen gift'
      })
    })
  },

  removeUserOrders: (req, res) => {
    let currUser = req.body.user;
    Orders.deleteMany(
      {
        user: currUser,
      }).then(() => {
        res.status(200).json({
          message: "You`ve made it!!!"
        })
      })
  },

  deleteGift: (req, res) => {

    let query = { '_id': req.body._id };

    Gift.deleteOne(query, function (err) {
      console.log(err)
    })
      .then(() => {
        res.status(200)
          .json({
            message: 'Gift deleted successfully!',
          })
      })
  },

  editGift: (req, res) => {
    let query = { '_id': req.body._id };
    let newData = {
      giftName: req.body.giftName,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price
    }

    Gift.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
      if (err) {
        console.log("An error occurred while updating document:")
        console.log(err)
        return res.send(500, { error: err });
      }
      return res.send("succesfully saved");
    })
      .then((gift) => {
        res.status(200)
          .json({
            message: 'Gift edit successfully!',
            gift
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },


}