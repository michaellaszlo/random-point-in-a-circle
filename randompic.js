var RandomPointInCircle = (function () {
  var diameter = 250,
      x0 = diameter / 2,
      y0 = diameter / 2,
      pointRadius = 2.5,
      radius = diameter / 2 - pointRadius,
      numPoints = Math.floor(Math.pow(radius / (1.5 * pointRadius), 2)),
      color = {
        background: '#f2f0dd',
        point: '#415a42'
      },
      wrapper,
      badDemo,
      goodDemo;

  function CircleDemo() {
    this.canvas = document.createElement('canvas'),
    this.context = this.canvas.getContext('2d');
  }

  CircleDemo.prototype = {
    constructor: CircleDemo,

    paintBackground: function () {
      var canvas = this.canvas,
          context = this.context;
      canvas.className = 'circle';
      canvas.width = canvas.height = diameter;
      wrapper.appendChild(canvas);
      context.fillStyle = color.background;
      context.beginPath();
      context.arc(x0, y0, diameter / 2, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    },

    paint: function () {
      var context = this.context,
          point,
          i;
      this.paintBackground();
      context.fillStyle = color.point;
      for (i = 0; i < numPoints; ++i) {
        point = this.selectRandomPoint();
        context.beginPath();
        context.arc(point.x, point.y, pointRadius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
      }
    }
  };

  function init() {
    wrapper = document.getElementById('wrapper');
    badDemo = new CircleDemo();
    goodDemo = new CircleDemo();
    badDemo.selectRandomPoint = function () {
      var angle = Math.random() * 2 * Math.PI,
          distance = Math.random() * radius;
      return {
        x: x0 + Math.cos(angle) * distance,
        y: y0 + Math.sin(angle) * distance
      };
    };
    goodDemo.selectRandomPoint = function () {
      var angle = Math.random() * 2 * Math.PI,
          distance = Math.max(Math.random(), Math.random()) * radius;
      return {
        x: x0 + Math.cos(angle) * distance,
        y: y0 + Math.sin(angle) * distance
      };
    };
    badDemo.paint();
    goodDemo.paint();
  }

  return {
    init: init
  };
})();

window.onload = RandomPointInCircle.init;
