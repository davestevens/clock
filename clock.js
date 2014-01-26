var Clock = (function () {
  var Clock = function (params) {
    this.initialize_params(params || {});
    this.display();
    this.animate();
  };

  // Create view and append to document
  Clock.prototype.display = function () {
    this.create_view();
    this.create_hand();

    this.view.appendChild(this.hand);
    {
      var parent = this.el || document.body;
      parent.appendChild(this.view);
    }
  };

  // Animate clock
  Clock.prototype.animate = function () {
    var angle = this.calculate_angle();

    this.set_view_port(angle);
    this.rotate_hand(angle);

    {
      var self = this;
      requestAnimationFrame(function () {
        self.animate();
      });
    }
  };

  // Create the view element of the Clock display
  Clock.prototype.create_view = function () {
    var view = document.createElement("div");
    view.style.width = this.style.view.size + "px";
    view.style.height = this.style.view.size + "px";
    view.style.position = "relative";
    view.style.borderRadius = "50%";
    view.style.WebkitBorderRadius = "50%";
    view.style.MozBorderRadius = "50%";
    view.style.borderRadius = "50%";
    view.style.border = this.style.view.border.size + "px solid " +
      this.style.view.border.color;
    view.style.background = "url('" + this.style.clock.image + "')";
    view.style.backgroundSize = this.style.clock.size + "px " +
      this.style.clock.size + "px";

    return this.view = view;
  };

  // Create the hand element of the Clock display
  Clock.prototype.create_hand = function () {
    var hand = document.createElement("div");
    hand.style.left = (this.style.view.size / 2) -
      (this.style.hand.size / 2) + "px";
    hand.style.position = "absolute";
    hand.style.width = this.style.hand.size + "px";
    hand.style.background = this.style.hand.color;
    hand.style.height = this.style.view.size + "px";

    return this.hand = hand;
  };

  // Return the time which is then used with the resolution to define positon of
  // the clock
  Clock.prototype.time = function () {
    var date, time;

    date = new Date();

    time = date.getHours();
    time = (time > 12) ? (time - 12) : time;
    time = (time === 12) ? 0 : time;

    time *= (60 * 60);
    time += (date.getMinutes() * 60);
    time += date.getSeconds();

    return time;
  };

  Clock.prototype.calculate_angle = function () {
    return (this.time() * ((2 * Math.PI) / (12 * 60 * 60)));
  };

  // Convert point on outer circle of clock face to percentage for positioning
  // background image
  Clock.prototype.position = function (coord) {
    var radius = this.style.clock.size / 2;

    if (coord < 0) {
      return (((radius - Math.abs(coord)) / radius) / 2) * 100;
    } else {
      return (((coord / radius) / 2) + 0.5) * 100;
    }
  };

  // Set background position of clock face
  Clock.prototype.set_view_port = function (angle) {
    var x, y, radius;

    radius = this.style.clock.size / 2;
    angle -= (Math.PI / 2);
    x = radius * Math.cos(angle);
    y = radius * Math.sin(angle);

    this.view.style.backgroundPosition = this.position(x) + "% " +
      this.position(y) + "%";
  };

  // Set rotation of clock hand
  Clock.prototype.rotate_hand = function (angle) {
    this.hand.style.webkitTransform = "rotate(" + angle + "rad)";
  };

  Clock.prototype.initialize_params = function (params) {
    this.params = params.merge(default_params);
    this.style = {}.merge(this.params.style);

    this.calculate_angle = this.params.calculate_angle || this.calculate_angle
  };

  // Default Params for creating clock (Override from constructor)
  var default_params = {
    style: {
      view: {
        size: 200,
        border: {
          size: 4,
          color: "black"
        }
      },
      hand: {
        size: 2,
        color: "red"
      },
      clock: {
        size: 800,
        image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="400" width="400"><defs><g id="small"><line x1="200" y1="32" x2="200" y2="34" stroke="black" stroke-width="1"/></g><g id="medium"><line x1="200" y1="32" x2="200" y2="38" stroke="black" stroke-width="1"/></g><g id="large"><line x1="200" y1="32" x2="200" y2="46" stroke="black" stroke-width="2"/></g><g id="ticks"><g transform="rotate(5 200 200)"><use xlink:href="#small"/></g><g transform="rotate(10 200 200)"><use xlink:href="#small"/></g><g transform="rotate(15 200 200)"><use xlink:href="#medium"/></g><g transform="rotate(20 200 200)"><use xlink:href="#small"/></g><g transform="rotate(25 200 200)"><use xlink:href="#small"/></g><g transform="rotate(30 200 200)"><use xlink:href="#large"/></g></g></defs><g transform="rotate(0 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(30 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(60 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(90 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(120 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(150 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(180 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(210 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(240 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(270 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(300 200 200)"><use xlink:href="#ticks"/></g><g transform="rotate(330 200 200)"><use xlink:href="#ticks"/></g></svg>'
      }
    }
  };

  return Clock;
})();

var requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame || function (func) {
    setTimeout(func, 1000);
  };

Object.prototype.merge = function (x) {
  for (i in x) {
    if (typeof(x[i]) === "object" && this[i]) {
      this[i] = this[i].merge(x[i]) || x[i];
    } else {
      this[i] = this[i] || x[i];
    }
  }
  return this;
};
