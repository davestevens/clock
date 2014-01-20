var view_size = 200;
var clock_size = 800;

var view_border_size = 4;
var view_border_colour = "black";

var face_image = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="400" width="400"><defs><g id="small"><line x1="200" y1="32" x2="200" y2="34" stroke="black" stroke-width="1"/></g><g id="medium"><line x1="200" y1="32" x2="200" y2="38" stroke="black" stroke-width="1"/></g><g id="large"><line x1="200" y1="32" x2="200" y2="46" stroke="black" stroke-width="2"/></g><g id="ticks"><g transform="rotate(5 200 200)"><use xlink:href="#small"/></g><g transform="rotate(10 200 200)"><use xlink:href="#small"/></g><g transform="rotate(15 200 200)"><use xlink:href="#medium"/></g><g transform="rotate(20 200 200)"><use xlink:href="#small"/></g><g transform="rotate(25 200 200)"><use xlink:href="#small"/></g><g transform="rotate(30 200 200)"><use xlink:href="#large"/></g></g></defs><g transform="rotate(0 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(30 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(60 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(90 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(120 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(150 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(180 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(210 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(240 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(270 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(300 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(330 200 200)"><use xlink:href="#ticks"/></g></svg>';

var view = document.createElement("div");
view.id = "clock";
view.style.width = view_size + "px";
view.style.height = view_size + "px";
view.style.position = "relative";
view.style.borderRadius = "50%";
view.style.WebkitBorderRadius = "50%";
view.style.MozBorderRadius = "50%";
view.style.borderRadius = "50%";
view.style.border = view_border_size + "px solid " + view_border_colour;
view.style.background = "url('" + face_image + "')";
view.style.backgroundSize = clock_size + "px " + clock_size + "px";

var hand_size = 2;
var hand_colour = "red";

var hand = document.createElement("hand");
hand.id = "hand";
hand.style.left = (view_size / 2) - (hand_size / 2) + "px";
hand.style.position = "absolute";
hand.style.width = hand_size + "px";
hand.style.background = hand_colour;
hand.style.height = view_size + "px";

view.appendChild(hand);

document.body.appendChild(view);
var diameter = clock_size;
var radius = diameter / 2;

var milli_seconds_to_rads = function (milli_seconds) {
  return (milli_seconds * ((2 * Math.PI) / 60000));
};

var milli_seconds_to_degs = function (milli_seconds) {
  return (milli_seconds * (360 / 60000));
};

// Convert co-ordinate to percentage
var position = function (coord) {
  if (coord < 0) {
    return (((radius - Math.abs(coord)) / radius) / 2) * 100;
  } else {
    return (((coord / radius) / 2) + 0.5) * 100;
  }
};

var alter_view_port = function (milli_seconds) {
  var angle, x, y;

  angle = milli_seconds_to_rads(milli_seconds) - (Math.PI / 2);
  x = radius * Math.cos(angle);
  y = radius * Math.sin(angle);

  view.style.backgroundPosition = position(x) + "% " + position(y) + "%";
};

var rotate_hand = function (milli_seconds) {
  var deg = milli_seconds_to_degs(milli_seconds);
  hand.style.webkitTransform = "rotate(" + deg + "deg)";
};

var update = function () {
  var date, milli_seconds;

  date = new Date();
  milli_seconds = date.getMilliseconds() + (date.getSeconds() * 1000);

  alter_view_port(milli_seconds);
  rotate_hand(milli_seconds);
};

// Call each second to update
setInterval(update, 60);
