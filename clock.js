var view_size = 200;
var clock_size = 800;

var view_border_size = 4;
var view_border_colour = "black";

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
view.style.background = "url(" + image + ") no-repeat";
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
