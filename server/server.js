var apq=[];
var parr=[];
var ty=0;

const express = require('express');
var {Product}= require('./models/product');
var async= require('async');
var passport= require('passport');
var flash= require('connect-flash');
var validator= require('express-validator');
var cookieParser= require('cookie-parser');
var hbs= require('hbs');
var User= require('./models/usersignup');
var {Product} =require('./models/product');
var Order=require('./models/orders');
var {mongoose} = require('./db/mongoose');
var Cart= require('./models/cart');
var session= require('express-session');
const bodyParser = require('body-parser');
var MongoStore= require('connect-mongo')(session);
const path= require('path');
const publicPath= path.join(__dirname, '..');
var app= express();
const PORT= process.env.PORT || 3000;
require('../config/passport');
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(cookieParser());
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $= require('jQuery');
app.use(session({
   secret: 'mysupersecret',
   resave: false,
   saveUninitialized: false,
   store: new MongoStore({mongooseConnection: mongoose.connection}),
   cookie: { maxAge: 180*60*1000 }
}));

hbs.registerHelper('ifEquals', function(arg1, arg2, options){
  return (arg1==arg2)? options.fn(this): options.inverse(this);
});

hbs.registerHelper('ifNotequals', function(arg1, arg2, options){
  return (arg1!=arg2)? options.fn(this): options.inverse(this);
});

app.use(function(req,res, next){

  res.locals.session= req.session;
  next();
});
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/../views/partials');

var urlencodedParser= bodyParser.urlencoded({extended:true});
app.use(validator());
app.use(function(req,res,next){
  res.locals.login=req.isAuthenticated();
  next();
});
function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
  {
    return next();
  }
  res.redirect('/');
}
function isLoggedInn(req, res, next){
  if(req.isAuthenticated())
  {
    return next();
  }
  req.session.oldurl=req.url;
  res.redirect('/login');
}
function isLoggedOut(req, res, next){
  if(!req.isAuthenticated())
  {
    return next();
  }
res.redirect('/');
}
app.get('/signup',isLoggedOut,(req,res, next)=>{
  var messages= req.flash('error');
  res.render(path.join(__dirname+ '/../signup.hbs'),{messages:messages, hasErrors:messages.length>0});
  console.log('hello');
});
app.post('/signup1',isLoggedOut, urlencodedParser,
  passport.authenticate('local-signup',{
failureRedirect:'/signup',
failureFlash: true
}),function(req,res,next){
  if(req.session.oldurl)
  {
    var oldurl=req.session.oldurl;
    req.session.oldurl=null;
    res.redirect(oldurl);
  }
  else {

    res.redirect('/');
  }
});
app.post('/logincheck', urlencodedParser,
  passport.authenticate('local-signin',{
failureRedirect:'/login',
failureFlash: true
}),function(req, res, next){
  User.find({_id:req.user}, function(err, user)
{console.log('iop');
  if(!err)
  {
    if(user[0].email=="admin@gmail.com")
    {console.log('found admin');
      res.redirect('/profilee');
    }
    else{  if(req.session.oldurl)
      {
        var oldurl=req.session.oldurl;
        req.session.oldurl=null;
        res.redirect(oldurl);
      }
      else res.redirect('/');

    }
  }
});


}
);
var cart2;
function hereone(id, cart1){
  setTimeout(here,60000,id,cart1);
}
function here(id, cart1){
console.log('inside delay fn');

    console.log('current cart');
    console.log(cart1);
    cart1.removeitem(id);
    cart2=cart1;
    console.log('new cart');
    console.log(session.cart);

}
app.get('/placeorder', urlencodedParser,(req,res)=>{
    var cart= new Cart(req.session.cart ? req.session.cart : {});
parr=[];
    var arr123=cart.generateArray();

    async.eachSeries(arr123, function (storedItem, next){
  console.log('ids of item checked', storedItem.item.id);
      Product.findOne({id:storedItem.item.id}, function(err, prod){
        if(err)
        {
          console.log('error for id', id);
        }
  console.log('matched id is',storedItem.item.id);

          var si=storedItem.qty1;
          var mi= storedItem.qty2;
          var li=storedItem.qty3;
          var xli=storedItem.qty4;
          var xxli=storedItem.qty5;

  if(storedItem.item.category=="Men Footwear"||storedItem.item.category=="Women Footwear")
  {if(prod.s<si)
  {
    parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 6") ;

    }
    if(prod.m<mi)
    {
      parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 7");

    }
    if(prod.l<li)
    {parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 8");

    }
    if(prod.xl<xli)
    {
      parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 9");
      console.log('pushingg', storedItem.item.title);

    }
    if(prod.xxl<xxli)
    {parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 10");

    }
  }
  else{
  if(prod.s<si)
  {parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: S") ;

  }
  if(prod.m<mi)
  {
    parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: M");

  }
  if(prod.l<li)
  {parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: L");

  }
  if(prod.xl<xli)
  {
    parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: XL");


  }
  if(prod.xxl<xxli)
  {parr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: XXL");

  }
  }
    });
    next();
    });






//console.log('heiuyrti');
//console.log(arr12);
res.redirect('/placeorderone');
//  res.render(path.join(__dirname+ '/../placeorder.hbs'), {protitles: arr, products: cart.generateArray(), totalPrice:cart.totalPrice, totalQty: cart.totalQty});


});
app.get('/placeorderone', urlencodedParser, (req,res)=>
{var cart= new Cart(req.session.cart ? req.session.cart : {});
var sc=0;
  console.log('ye hai',parr);
  cart.makechanges();
  cart.deleteoutofstock();
  req.session.cart=cart;
  var s= new Cart(req.session.cart);
var ty=cart.totalPrice;
console.log(ty);
if(ty<500)
{
  sc=(20*req.session.cart.totalPrice)/100;
  sc= Math.floor(sc);
}
var p=false;

var total=sc+ty;
res.render(path.join(__dirname+ '/../placeorder.hbs'), {protitles: parr, products: s.generateArray1(),total:total, totalPrice:cart.totalPrice, totalQty: cart.totalQty, sc:sc});

});
app.get('/deleteproduct/:id',isLoggedIn, (req,res)=>{
  var id=req.params.id;
  console.log('id is',id);
  Product.findOneAndRemove({id:id}, function(err,doc){

  });

res.redirect('/profilee');
});
app.post('/checkout',isLoggedInn ,urlencodedParser, (req,res)=>{
  if(!req.session.cart)
  {
    res.redirect('/shoppingcart');
  }
  var cart= new Cart(req.session.cart);
  var arr=cart.generateArray();
  async.eachSeries(arr, function (storedItem, next){
console.log('ids of item checked', storedItem.item.id);
    Product.findOne({id:storedItem.item.id}, function(err, prod){
      if(err)
      {
        console.log('error for id', id);
      }
console.log('matched id is',storedItem.item.id);

op=prod.xxl-storedItem.qty5;
op1=prod.xl-storedItem.qty4;
op2=prod.l-storedItem.qty3;
op3=prod.m-storedItem.qty2;
op4=prod.s-storedItem.qty1;
        Product.findOneAndUpdate({id:storedItem.item.id},{$set:{xxl:op,xl:op1,l:op2,m:op3,s:op4}}, {new: true}).then((prod)=>{
        });

}
);
next();
});

const stripe = require("stripe")("sk_test_xperbra8o4AuWGqyK7fAuZT300AqQ0dy0y");

  stripe.charges.create({
    amount:cart.totalPrice,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description:"test charge"
  }, function(err, charge) {
    // asynchronously called
    if(err)
    {
      req.flash('error', err.message);
      return res.redirect('/checkout');

    }
var order= new Order({
  user:req.user,
  cart:cart,
  address:req.body.address,
  name:req.body.name,
  paymentId:charge.id
});

order.save(function(err, result){
  req.flash('success','Successfully bought product!');
  req.session.cart=null;
  res.redirect('/');
});

  });
});
app.get('/checkoutform', isLoggedInn,urlencodedParser, (req, res)=>{
  if(!req.session.cart)
  {
    res.redirect('/shoppingcart');
  }
  var cart= new Cart(req.session.cart);
  var errMsg= req.flash('error')[0];
  var p=false;
  if(req.user.email=='admin@gmail.com'){p=true;}
  res.render(path.join(__dirname+ '/../checkoutform.hbs'), {isAdmin:p, totalPrice:cart.totalPrice, errMsg:errMsg, noError:!errMsg});
});
app.post('/addtocart', urlencodedParser, (req,res)=>{
  console.log('jii');

  var productId= req.body.idnumber;
  var prodsize= req.body.select;
  console.log(prodsize);
  console.log('here it is');


  var cart= new Cart(req.session.cart ? req.session.cart : {});
  console.log(productId);
  Product.findOne({id: productId}, function(err, product){
    if(err)
    {
      return res.redirect('/menfootwear');
    }
console.log('product is here');
    cart.add(product, productId, prodsize);
  req.session.cart= cart;
  console.log('hm', cart);
res.redirect('/shoppingcart');




  });

});

app.post('/adminnext',isLoggedIn, urlencodedParser, (req,res)=>{
  var pro = new Product({
    id: req.body.id,
  title: req.body.title,
  imgpath1: req.body.image1,
  imgpath2: req.body.image2,
imgpath3: req.body.image3,
imgpath4: req.body.image4,
  imgpath5: req.body.image5,
 description: req.body.description,
   price: req.body.price,
   s: req.body.s,
   m: req.body.m,
   l: req.body.l,
   xl: req.body.xl,
   xxl: req.body.xxl,
   specification:req.body.specification,
   category: req.body.category
  });
  pro.save().then((doc) => {
    console.log('your product is saved');
    res.send(doc);
  }, (e) => {
    console.log('error is',e);
    res.status(400).send(e);
  });
console.log('has been saved');
  res.redirect('/profilee');
});
app.get('/',urlencodedParser,(req,res)=>{
var successMsg= req.flash('success')[0];
   Product.find({category: 'Women Kurti'},function(err,docs){
     var productchunk=[];
     var chunksize=3;

console.log(docs);
     for(var i=0;i<docs.length;i=i+chunksize)
     {
       productchunk.push(docs.slice(i, i+chunksize));

     }
       res.render(path.join(__dirname+ '/../index.hbs'), {products: productchunk, successMsg:successMsg, noMsg: !successMsg});
   });

});
app.get('/refreshingcart',urlencodedParser,(req,res)=>{
    //var cart= new Cart(req.session.cart ? req.session.cart : {});
  console.log(cart);
  //res.redirect('/shoppingcart');
  Product.find({category: 'womenkurti'},function(err,docs){
    var productchunk=[];
    var chunksize=3;

    for(var i=0;i<docs.length;i=i+chunksize)
    {
      productchunk.push(docs.slice(i, i+chunksize));
    }
      res.render(path.join(__dirname+ '/../index.hbs'), {products: productchunk});
  });
});
app.get('/admin',(req,res)=>{


  res.render(path.join(__dirname+ '/../adminform.hbs'))

});


app.get('/productdetails',(req,res)=>{
  console.log('working');
res.sendFile(path.join(__dirname+ '/../productdetails.html'));


});
app.get('/shoppingcart', (req,res, next)=>{
  if(!req.session.cart)
  {
  return  res.render(path.join(__dirname+ '/../shoppingcart.hbs'), {products: null});
  }
  var cart= new Cart(req.session.cart);
var p=false;

console.log('qwas',p);
  res.render(path.join(__dirname+ '/../shoppingcart.hbs'), {products: cart.generateArray(), totalPrice :cart.totalPrice});
});
app.post('/editadminform',urlencodedParser,(req,res)=>{
Product.find({id:req.body.idnumber},(err,docs)=>{
  console.log('yooooooo',docs);
  res.render(path.join(__dirname+ '/../editadminform.hbs'),{products:docs[0]});
});

});
app.post('/confirmedit',urlencodedParser, (req,res)=>{
  var id=req.body.id;
  Product.findOneAndUpdate({id:req.body.id},{$set:{xxl:req.body.xxl,xl:req.body.xl,l:req.body.l,m:req.body.m,s:req.body.s,title: req.body.title,imgpath1: req.body.image1, imgpath2: req.body.image2,imgpath3: req.body.image3,
  imgpath4: req.body.image4,imgpath5: req.body.image5, specification:req.body.specification,description: req.body.description,price: req.body.price,}}, {new: true}).then((prod)=>{
  });

  res.redirect('/profilee');
});
app.get('/reduceby1/:id/:size',(req,res)=>{
  console.log('hey');
  var ProductId= req.params.id;
  var size= req.params.size;
  var cart= new Cart(req.session.cart ? req.session.cart: {});
  cart.reducebyone( ProductId,size);
  req.session.cart=cart;
  res.redirect('/shoppingcart');
});
app.get('/removeitem/:id',(req,res)=>{

  var ProductId= req.params.id;

  var cart= new Cart(req.session.cart ? req.session.cart: {});
  cart.removeitem( ProductId);
  req.session.cart=cart;
  res.redirect('/shoppingcart');
});
app.get('/removeall',(req,res)=>{
  var cart= new Cart(req.session.cart ? req.session.cart: {});
  cart.removeall();
  req.session.cart=cart;
  res.redirect('/shoppingcart');
});
app.get('/increaseby1/:id/:size',(req,res)=>{
  console.log('hey');
  var ProductId= req.params.id;
  var size= req.params.size;
  var cart= new Cart(req.session.cart ? req.session.cart: {});
  cart.increasebyone( ProductId,size);
  req.session.cart=cart;
  res.redirect('/shoppingcart');
});

app.get('/mentopwear',(req,res)=>{
  Product.find({category: 'Men Topwear'}, function(err,docs){
    var os,om,ol,oxl,oxxl;
    for(var i=0;i<docs.length;i++){
     os=false;
     om= false;
     ol= false;
   oxl=false;
     oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;


docs[i].os=os;
docs[i].om=om;
docs[i].ol=ol;
docs[i].oxl=oxl;
docs[i].oxxl=oxxl;

}
var arr=[];
for(var i=0;i<docs.length;i++){
var obj={
  id:docs[i].id,
  title:docs[i].title,
  description:docs[i].description,
  price:docs[i].price,
  imgpath1:docs[i].imgpath1,
  os:docs[i].os,
  om:docs[i].om,
  ol:docs[i].ol,
  oxl:docs[i].oxl,
  oxxl:docs[i].oxxl,
  category:docs[i].category
}
arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }


      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.post('/displayproductdetails', urlencodedParser, (req, res)=>{
  Product.find({id: req.body.idnumber}, function(err,docs){
     var os=false;
     var om= false;
     var ol= false;
     var oxl=false;
     var oxxl= false;
     if(docs[0].s==0)
     os=true;
     if(docs[0].m==0)
     om=true;
     if(docs[0].l==0)
     ol=true;
     if(docs[0].xl==0)
     oxl=true;
     if(docs[0].xxl==0)
     oxxl=true;
docs[0].os=os;
docs[0].om=om;
docs[0].ol=ol;
docs[0].oxl=oxl;
docs[0].oxxl=oxxl;
    if((docs[0].category=='Men Footwear')||docs[0].category=='Women Footwear')
    {
      res.render(path.join(__dirname+ '/../productdetailstwo.hbs'), {products:docs});
    }
    else{
console.log(docs);
      res.render(path.join(__dirname+ '/../productdetailsone.hbs'), {products:docs});}
  });


});
app.get('/menbottomwear',(req,res)=>{
  Product.find({category: 'Men Bottomwear'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
docs[i].os=os;
docs[i].om=om;
docs[i].ol=ol;
docs[i].oxl=oxl;
docs[i].oxxl=oxxl;
}
var arr=[];
for(var i=0;i<docs.length;i++){
var obj={
  id:docs[i].id,
  title:docs[i].title,
  description:docs[i].description,
  price:docs[i].price,
  category:docs[i].category,
  imgpath1:docs[i].imgpath1,
  os:docs[i].os,
  om:docs[i].om,
  ol:docs[i].ol,
  oxl:docs[i].oxl,
  oxxl:docs[i].oxxl
}
arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/menfootwear',(req,res)=>{
  Product.find({category: 'Men Footwear'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
docs[i].os=os;
docs[i].om=om;
docs[i].ol=ol;
docs[i].oxl=oxl;
docs[i].oxxl=oxxl;
}
var arr=[];
for(var i=0;i<docs.length;i++){
var obj={
  id:docs[i].id,
  title:docs[i].title,
  description:docs[i].description,
  price:docs[i].price,
  category:docs[i].category,
  imgpath1:docs[i].imgpath1,
  os:docs[i].os,
  om:docs[i].om,
  ol:docs[i].ol,
  oxl:docs[i].oxl,
  oxxl:docs[i].oxxl
}
arr.push(obj);}
    var productchunk=[];

    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/womenkurti',(req,res)=>{
  Product.find({category: 'Women Kurti'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
    docs[i].os=os;
    docs[i].om=om;
    docs[i].ol=ol;
    docs[i].oxl=oxl;
    docs[i].oxxl=oxxl;
    }
    var arr=[];
    for(var i=0;i<docs.length;i++){
    var obj={
    id:docs[i].id,
    title:docs[i].title,
    description:docs[i].description,
    price:docs[i].price,
    category:docs[i].category,
    imgpath1:docs[i].imgpath1,
    os:docs[i].os,
    om:docs[i].om,
    ol:docs[i].ol,
    oxl:docs[i].oxl,
    oxxl:docs[i].oxxl
    }
    arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/womenwestern',(req,res)=>{
  Product.find({category: 'Women Western'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
docs[i].os=os;
docs[i].om=om;
docs[i].ol=ol;
docs[i].oxl=oxl;
docs[i].oxxl=oxxl;
}
var arr=[];
for(var i=0;i<docs.length;i++){
var obj={
  id:docs[i].id,
  title:docs[i].title,
  description:docs[i].description,
  price:docs[i].price,
  category:docs[i].category,
  imgpath1:docs[i].imgpath1,
  os:docs[i].os,
  om:docs[i].om,
  ol:docs[i].ol,
  oxl:docs[i].oxl,
  oxxl:docs[i].oxxl
}
arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<docs.length;i=i+chunksize)
    {
      productchunk.push(docs.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/womenfootwear',(req,res)=>{
  Product.find({category: 'Women Footwear'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
    docs[i].os=os;
    docs[i].om=om;
    docs[i].ol=ol;
    docs[i].oxl=oxl;
    docs[i].oxxl=oxxl;
    }
    var arr=[];
    for(var i=0;i<docs.length;i++){
    var obj={
    id:docs[i].id,
    title:docs[i].title,
    description:docs[i].description,
    price:docs[i].price,
    category:docs[i].category,
    imgpath1:docs[i].imgpath1,
    os:docs[i].os,
    om:docs[i].om,
    ol:docs[i].ol,
    oxl:docs[i].oxl,
    oxxl:docs[i].oxxl
    }
    arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/boysclothing',(req,res)=>{
  Product.find({category: 'Boys Clothing'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
    docs[i].os=os;
    docs[i].om=om;
    docs[i].ol=ol;
    docs[i].oxl=oxl;
    docs[i].oxxl=oxxl;
    }
    var arr=[];
    for(var i=0;i<docs.length;i++){
    var obj={
    id:docs[i].id,
    title:docs[i].title,
    description:docs[i].description,
    price:docs[i].price,
    category:docs[i].category,
    imgpath1:docs[i].imgpath1,
    os:docs[i].os,
    om:docs[i].om,
    ol:docs[i].ol,
    oxl:docs[i].oxl,
    oxxl:docs[i].oxxl
    }
    arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/girlsclothing',(req,res)=>{
  Product.find({category: 'Girls Clothing'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
    docs[i].os=os;
    docs[i].om=om;
    docs[i].ol=ol;
    docs[i].oxl=oxl;
    docs[i].oxxl=oxxl;
    }
    var arr=[];
    for(var i=0;i<docs.length;i++){
    var obj={
    id:docs[i].id,
    title:docs[i].title,
    description:docs[i].description,
    price:docs[i].price,
    category:docs[i].category,
    imgpath1:docs[i].imgpath1,
    os:docs[i].os,
    om:docs[i].om,
    ol:docs[i].ol,
    oxl:docs[i].oxl,
    oxxl:docs[i].oxxl
    }
    arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});
app.get('/kidsac',(req,res)=>{
  Product.find({category: 'Kids Accessories'}, function(err,docs){
    for(var i=0;i<docs.length;i++){
    var os=false;
    var om= false;
    var ol= false;
    var oxl=false;
    var oxxl= false;
    if(docs[i].s==0)
    os=true;
    if(docs[i].m==0)
    om=true;
    if(docs[i].l==0)
    ol=true;
    if(docs[i].xl==0)
    oxl=true;
    if(docs[i].xxl==0)
    oxxl=true;
    docs[i].os=os;
    docs[i].om=om;
    docs[i].ol=ol;
    docs[i].oxl=oxl;
    docs[i].oxxl=oxxl;
    }
    var arr=[];
    for(var i=0;i<docs.length;i++){
    var obj={
    id:docs[i].id,
    title:docs[i].title,
    description:docs[i].description,
    price:docs[i].price,
    category:docs[i].category,
    imgpath1:docs[i].imgpath1,
    os:docs[i].os,
    om:docs[i].om,
    ol:docs[i].ol,
    oxl:docs[i].oxl,
    oxxl:docs[i].oxxl
    }
    arr.push(obj);}
    var productchunk=[];
    var chunksize=3;
    for(var i=0;i<arr.length;i=i+chunksize)
    {
      productchunk.push(arr.slice(i, i+chunksize));
    }

      res.render(path.join(__dirname+ '/../productsdisplay.hbs'), {products:productchunk});
  });

});

app.get('/login',isLoggedOut,(req,res)=>{
  var messages= req.flash('error');
  res.render(path.join(__dirname+ '/../login.hbs'),{messages:messages, hasErrors:messages.length>0});

});
app.get('/profilee',isLoggedIn,(req,res)=>{
if(req.user.email=='admin@gmail.com'){

  Product.find(function(err,docs){
    res.render(path.join(__dirname+ '/../profile1.hbs'), {products:docs,email:req.user.email});
  });

}
else{
  Order.find({user:req.user}, function(err, orders){
    if(err)
    {
      return res.write('Error!');
    }
    var cart;

    orders.forEach(function(order){
      cart= new Cart(order.cart);
      order.items= cart.generateArray();
    });

      res.render(path.join(__dirname+ '/../profile.hbs'), {orders:orders,email:req.user.email});

  });}
});

app.get('/logout', isLoggedIn,(req,res)=>{
  req.session.cart=null;
  req.logout();
  res.redirect('/');
});

app.get('/adminnextpage',(req,res)=>{
    res.sendFile(path.join(__dirname+ '/../adminnext.html'));
});
app.listen(PORT, ()=>{
  console.log(`server is up on port ${PORT}`);
});
