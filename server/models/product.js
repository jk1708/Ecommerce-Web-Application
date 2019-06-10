var mongoose = require('mongoose');

const validator = require('validator');
const jwt = require('jsonwebtoken');
var Product = mongoose.model('Product', {
  imgpath1: {
    type: String,
    required: true

  },
  imgpath2: {
    type: String

  },
  imgpath3: {
    type: String

  },
  imgpath4: {
    type: String

  },
  imgpath5: {
    type: String

  },
id:{
  type: String,
  required: true
},
  title: {
    type: String,
    required: true

  },
  description: {
    type: String,
required: true
  },
  category:{
    type: String,
    required: true
  },
  price: {
  type: Number,
 required: true,

},
s: {
  type: Number,
  required: true
},
m: {
  type: Number,
  required: true
},
l: {
  type: Number,
  required: true
},
xl: {
  type: Number,
  required: true
},
xxl: {
  type: Number,
  required: true
},
specification:{
  type: String
}
});

module.exports = {Product};
