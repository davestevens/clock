var view_size = 200;
var clock_size = 800;

var view_border_size = 4;
var view_border_colour = "black";

var view = document.createElement("div");
view.id = "clock";
view.style.width = view_size + "px";
view.style.height = view_size + "px";
view.style.position = "relative";
// TODO: set all
view.style.borderRadius = "50%";
view.style.border = view_border_size + "px solid " + view_border_colour;
view.style.background = "url(" + image + ") no-repeat";
view.style.backgroundSize = clock_size + "px " + clock_size + "px";
// TODO: set all
view.style.webkitTransition = "1s ease";

var hand_size = 2;
var hand_colour = "red";

var hand = document.createElement("hand");
hand.id = "hand";
hand.style.left = (view_size / 2) - (hand_size / 2) + "px";
hand.style.position = "absolute";
hand.style.width = hand_size + "px";
hand.style.background = hand_colour;
hand.style.height = view_size + "px";
hand.style.webkitTransition = "1s ease";

view.appendChild(hand);

document.body.appendChild(view);
var diameter = clock_size;
var radius = diameter / 2;

var seconds_to_rads = function (seconds) {
  return (seconds * ((2 * Math.PI) / 60));
};

var seconds_to_degs = function (seconds) {
  return (seconds * (360 / 60));
};

// Convert co-ordinate to parcentage
var position = function (coord) {
  if (coord < 0) {
    return (((radius - Math.abs(coord)) / radius) / 2) * 100;
  } else {
    return (((coord / radius) / 2) + 0.5) * 100;
  }
};

var update = function () {
  var seconds, angle, x, y;

  seconds = new Date().getSeconds();

  angle = seconds_to_rads(seconds) - (Math.PI / 2);
  x = radius * Math.cos(angle);
  y = radius * Math.sin(angle);
  view.style.backgroundPosition = position(x) + "% " + position(y) + "%";

  // Rotate hand
  {
    var deg = seconds_to_degs(seconds);
    // Stop full backwards flip of hand
    if(deg === 0) {
      hand.style.webkitTransition = "none";
      hand.style.webkitTransform = "rotate(0deg)";
      setTimeout(function() {
        hand.style.webkitTransition = "1s ease";
      }, 1);
    } else {
      hand.style.webkitTransform = "rotate(" + deg + "deg)";
    }
  }
};

// Call each second to update
setInterval(update, 1000);
