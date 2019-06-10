var {Product}= require('../server/models/product');
const _ = require('lodash');
const express = require('express');


var {mongoose} = require('../server/db/mongoose');

const bodyParser = require('body-parser');
var product1 = new Product({
  imgpath: '../img1/p1.jpg',
 title: 'tshirt1',
 description: 'tshirt for men',
 category: 'mentopwear',
price: 399
});
product1.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product2 = new Product({
  imgpath: '../img1/p2.jpg',
 title: 'tshirt2',
 description: 'tshirt for men',
 category: 'mentopwear',
price: 499
});
product2.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product3= new Product({
  imgpath: '../img1/p3.jpg',
 title: 'tshirt3',
 description: 'tshirt for men',
 category: 'mentopwear',
price: 699
});
product3.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product4= new Product({
  imgpath: '../img1/p4.jpg',
 title: 'tshirt4',
 description: 'tshirt for men',
 category: 'mentopwear',
price: 999
});
product4.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product5= new Product({
  imgpath: '../img1/menfootwear2.jpg',
 title: 'Red Tape',
 description: 'Men formal slip-on shoes',
 category: 'mentfootwear',
price: 3999
});
product5.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product6= new Product({
  imgpath: '../img1/menfootwear1.jpg',
 title: 'United colors of Benetton',
 description: 'Men textured sneakers',
 category: 'mentfootwear',
price: 2999
});
product6.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product7= new Product({
  imgpath: '../img1/menbottomwear1.jpg',
 title: 'United colors of Benetton',
 description: 'Men skinny fit jeans',
 category: 'menbottomwear',
price: 1799
});
product6.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product8= new Product({
  imgpath: '../img1/menbottomwear2.jpg',
 title: 'Roadster',
 description: 'Men slim fit jeans',
 category: 'menbottomwear',
price: 1999
});
product8.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product9= new Product({
  imgpath: '../img1/menbottomwear3.jpg',
 title: 'Roadster',
 description: 'Men regular fit shorts',
 category: 'menbottomwear',
price: 1259
});
product9.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});

var product10= new Product({
  imgpath: '../img1/womenkurti1.jpg',
 title: 'Idalia',
 description: 'Women Solid Kurta',
 category: 'womenkurti',
price: 1399
});
product10.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product11= new Product({
  imgpath: '../img1/womenkurti2.jpg',
 title: 'Nayo',
 description: 'Women printed Kurta',
 category: 'womenkurti',
price: 1299
});
product11.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product12= new Product({
  imgpath: '../img1/womenwestern1.jpg',
 title: 'Tokyo Talkies',
 description: 'Women Printed Shirt Dress',
 category: 'womenwestern',
price: 869
});
product12.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product13= new Product({
  imgpath: '../img1/womenfootwear1.jpg',
 title: 'Street Style Store',
 description: 'Women Printed Open Toe Flats',
 category: 'womenfootwear',
price: 869
});
product13.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product14= new Product({
  imgpath: '../img1/boysclothing1.jpg',
 title: 'JKIDZ',
 description: 'Pack of 5 Printed T-Shirts',
 category: 'boysclothing',
price: 509
});
product14.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product15= new Product({
  imgpath: '../img1/girlsclothing1.jpg',
 title: 'YK',
 description: 'Girls Solid Pinafore Dress',
 category: 'girlsclothing',
price: 959
});
product15.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
var product16= new Product({
  imgpath: '../img1/kidsac1.jpg',
 title: 'Fantasy World',
 description: 'kids Digital Watch',
 category: 'kidsac',
price: 239
});
product16.save().then((doc) => {
  console.log('product saved');

}, (e) => {

});
