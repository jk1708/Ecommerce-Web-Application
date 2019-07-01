var async= require('async');

var {Product} =require('../models/product');
module.exports= function Cart(oldcart){
  this.items =oldcart.items|| {};
  this.totalQty= oldcart.totalQty || 0;
  this.totalPrice= oldcart.totalPrice || 0;
const func=(id)=>{
console.log('i a here');
  var storedItem= this.items[id];
  if(storedItem){
var op1,op2,op,op3,op4;
Product.findOne({id:id}, function(err, prod){
op=prod.xxl+storedItem.qty5;
op1=prod.xl+storedItem.qty4;
op2=prod.l+storedItem.qty3;
op3=prod.m+storedItem.qty2;
op4=prod.s+storedItem.qty1;

Product.findOneAndUpdate({id:id},{$set:{xxl:op,xl:op1,l:op2,m:op3,s:op4}}, {new: true}).then((prod)=>{
});
});

delete this.items[id];

}
};

var p=0,q=0;
  this.add =function(item, id, size){

    var storedItem= this.items[id];
    if(!storedItem){
      storedItem=this.items[id]={item: item, qty1:0, qty2:0, qty3:0, qty4:0, qty5:0, price1:0 };
    }
    console.log('size is');
    console.log(size);


     if(size=='S'|| size=='6')
{if(storedItem.qty1<storedItem.item.s)
//   Product.findOne({id:id}, function(err, prod){
//   op=prod.s;
//   op=op-1;
//   console.log(op);
//   Product.findOneAndUpdate({id:id},{$set:{s:op}}, {new: true}).then((prod)=>{
//  });
// });
{p++;
     storedItem.qty1++;}
   }
     else if(size=='M'||size=='7')
     {if(storedItem.item.m>storedItem.qty2)
{p++;
          storedItem.qty2++;}
}
     else if(size=='L'||size==8)
     {if(storedItem.item.l>storedItem.qty3)
     //   Product.findOne({id:id}, function(err, prod){
     //   op=prod.l;
     //   op=op-1;
     //   console.log(op);
     //   Product.findOneAndUpdate({id:id},{$set:{l:op}}, {new: true}).then((prod)=>{
     //  });
     // });
     {p++;
       storedItem.qty3++;
   }}
     else if(size=='XL'||size=='9')
     {if(storedItem.item.xl>storedItem.qty4)
     //   Product.findOne({id:id}, function(err, prod){
     //   op=prod.xl;
     //   op=op-1;
     //   console.log(op);
     //   Product.findOneAndUpdate({id:id},{$set:{xl:op}}, {new: true}).then((prod)=>{
     //  });
     // });
    {p++;
          storedItem.qty4++;}
}
     else if(size=='XXL'||size=='10')
     {if(storedItem.item.xxl>storedItem.qty5)
     //   Product.findOne({id:id}, function(err, prod){
     //   op=prod.xxl;
     //   op=op-1;
     //   console.log(op);
     //   Product.findOneAndUpdate({id:id},{$set:{xxl:op}}, {new: true}).then((prod)=>{
     //  });
     // });
          {storedItem.qty5++;
        p++;}}
if(p>0){
    storedItem.price1+= item.price;
    this.totalQty++;
    console.log('price of stored item is');
    console.log(item.price);
    this.totalPrice+= item.price;
}
  }
this.makechanges= function()
{

    arr123=this.generateArray();
    console.log(arr123);
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

    console.log('pushed', storedItem.item.title);
    storedItem.qty1=0;
    }
    if(prod.m<mi)
    {

    storedItem.qty2=0;
    }
    if(prod.l<li)
    {
    storedItem.qty3=0;
    }
    if(prod.xl<xli)
    {

      console.log('pushingg', storedItem.item.title);
    storedItem.qty4=0;
    }
    if(prod.xxl<xxli)
    {
    storedItem.qty5=0;
    }
  }
  else{
  if(prod.s<si)
  {
  console.log('pushed', storedItem.item.title);
  storedItem.qty1=0;
  }
  if(prod.m<mi)
  {

  storedItem.qty2=0;
  }
  if(prod.l<li)
  {
  storedItem.qty3=0;
  }
  if(prod.xl<xli)
  {


  storedItem.qty4=0;
  }
  if(prod.xxl<xxli)
  {
  storedItem.qty5=0;
  }
  }
    });
    next();
    });
    {console.log('for ids');





    }

};
this.placeorder= function()
{
var arr=[];
  var arr123=this.generateArray();
  console.log(arr123);
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
  arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 6") ;

  }
  if(prod.m<mi)
  {
    arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 7");

  }
  if(prod.l<li)
  {arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 8");

  }
  if(prod.xl<xli)
  {
    arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 9");
    console.log('pushingg', storedItem.item.title);

  }
  if(prod.xxl<xxli)
  {arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: 10");

  }
}
else{
if(prod.s<si)
{arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: S") ;

}
if(prod.m<mi)
{
  arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: M");

}
if(prod.l<li)
{arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: L");

}
if(prod.xl<xli)
{
  arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: XL");


}
if(prod.xxl<xxli)
{arr.push(storedItem.item.title+"    ("+storedItem.item.description+")      "+"   Size: XXL");

}
}
  });
  next();
  });


console.log(arr);
  return arr;
};

this.deleteoutofstock= function(){
  for(var id in this.items)
  {
    if(this.items[id].qty1+this.items[id].qty2+this.items[id].qty3+this.items[id].qty4+this.items[id].qty5==0)
    {this.removeitem(id);

    }
  }
};



  this.increasebyone=function(id, size){
    var storedItem= this.items[id];

     if(size=='S'|| size=='6')
     {
  if(storedItem.qty1<storedItem.item.s)
{q++;
storedItem.qty1++;
}
 }
     else if(size=='M'||size=='7')     {

       if(storedItem.qty2<storedItem.item.m)
     {q++;

       storedItem.qty2++;

     }
      }

     else if(size=='L'||size==8)
     {

  if(storedItem.qty3<storedItem.item.l)
{q++;
  storedItem.qty3++;
}
 }
     else if(size=='XL'||size=='9')
     {

  if(storedItem.qty4<storedItem.item.xl)
{q++;
  storedItem.qty4++;
}
 }
     else if(size=='XXL'||size=='10')
     {

  if(storedItem.qty5<storedItem.item.xxl)
{q++;
  storedItem.qty5++;
}
 }
 if(q>0)
 {  storedItem.price1+= storedItem.item.price;
   this.totalQty++;
   console.log('price of stored item is');
   console.log(storedItem.item.price);
   this.totalPrice+= storedItem.item.price;

 }
};






var w=0;
  this.reducebyone=function( id, size){
    var storedItem= this.items[id];


     if(size=='S'|| size=='6')
     {if(storedItem.qty1>0){
     storedItem.qty1--;
     w++;
     //   Product.findOne({id:id}, function(err, prod){
     //   op=prod.s;
     //   op=op+1;
     //   console.log(op);
     //   Product.findOneAndUpdate({id:id},{$set:{s:op}}, {new: true}).then((prod)=>{
     //  });
     // });
   }

 }
     else if(size=='M'||size=='7')     {

       if(storedItem.qty2>0){
       storedItem.qty2--;
w++;
       }
      }

     else if(size=='L'||size==8)
     {
       if(storedItem.qty3>0){
       storedItem.qty3--;
       w++;
     }
 }
     else if(size=='XL'||size=='9')
     {
       if(storedItem.qty4>0){
       storedItem.qty4--;
w++;
       }
 }
     else if(size=='XXL'||size=='10')
     {
       if(storedItem.qty5>0){
       storedItem.qty5--;
w++;
     }
 }
if(w>0){
    storedItem.price1-= storedItem.item.price;
    this.totalQty--;
           if(storedItem.qty1+storedItem.qty2+storedItem.qty3+storedItem.qty4+storedItem.qty5==0)
           {
             delete this.items[id];
           }
    this.totalPrice-= storedItem.item.price;

  };
};
this.removeitem1=function(id, cart){
console.log('removing');
    var storedItem= cart.items[id];
    console.log(storedItem);
    if(storedItem){
  var op1,op2,op,op3,op4;
  Product.findOne({id:id}, function(err, prod){
  op=prod.xxl+storedItem.qty5;
  op1=prod.xl+storedItem.qty4;
  op2=prod.l+storedItem.qty3;
  op3=prod.m+storedItem.qty2;
  op4=prod.s+storedItem.qty1;

  Product.findOneAndUpdate({id:id},{$set:{xxl:op,xl:op1,l:op2,m:op3,s:op4}}, {new: true}).then((prod)=>{
 });
});
delete cart.items[id];
console.log('findddddddddddddddd');
console.log(this);}
};
this.removeitem=function(id){
console.log('removing');
    var storedItem= this.items[id];

    if(storedItem){
      var sub=this.items[id].item.qty1+this.items[id].item.qty2+this.items[id].item.qty3+this.items[id].item.qty4+this.items[id].item.qty5;
      this.totalQty-=sub;
      this.totalPrice-=this.items[id].item.price;
  //var op1,op2,op,op3,op4
//   Product.findOne({id:id}, function(err, prod){
//   op=prod.xxl+storedItem.qty5;
//   op1=prod.xl+storedItem.qty4;
//   op2=prod.l+storedItem.qty3;
//   op3=prod.m+storedItem.qty2;
//   op4=prod.s+storedItem.qty1;
//
//   Product.findOneAndUpdate({id:id},{$set:{xxl:op,xl:op1,l:op2,m:op3,s:op4}}, {new: true}).then((prod)=>{
//  });
// });
delete this.items[id];
console.log('findddddddddddddddd');
console.log(this);}
}
this.removeall=function(){
  for(var id in this.items)
{
  this.removeitem(id);
}
};


this.generateArray= function(){

  var arr=[];
  for(var id in this.items)
  {if(this.items[id].qty1+this.items[id].qty2+this.items[id].qty3+this.items[id].qty4+this.items[id].qty5!=0)
    arr.push(this.items[id]);
  }
  return arr;
};

  this.generateArray1= function(){
    //  });

   arr123=this.generateArray();
   console.log(arr123);
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

   console.log('pushed', storedItem.item.title);
   storedItem.qty1=0;
   }
   if(prod.m<mi)
   {

   storedItem.qty2=0;
   }
   if(prod.l<li)
   {
   storedItem.qty3=0;
   }
   if(prod.xl<xli)
   {

     console.log('pushingg', storedItem.item.title);
   storedItem.qty4=0;
   }
   if(prod.xxl<xxli)
   {
   storedItem.qty5=0;
   }
 }
 else{
 if(prod.s<si)
 {
 console.log('pushed', storedItem.item.title);
 storedItem.qty1=0;
 }
 if(prod.m<mi)
 {

 storedItem.qty2=0;
 }
 if(prod.l<li)
 {
 storedItem.qty3=0;
 }
 if(prod.xl<xli)
 {


 storedItem.qty4=0;
 }
 if(prod.xxl<xxli)
 {
 storedItem.qty5=0;
 }
 }
   });
   next();
   });
   {console.log('for ids');





   }
    var arr=[];
    for(var id in this.items)
    {if(this.items[id].qty1+this.items[id].qty2+this.items[id].qty3+this.items[id].qty4+this.items[id].qty5!=0)
      arr.push(this.items[id]);
    }
    return arr;
  };
};
