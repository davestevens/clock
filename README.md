# Clock
Javascript Clock

## Usage
Include `clock.js`
```html
<script src="https://raw.github.com/davestevens/Clock/master/clock.js"></script>
```

Instantiate (all parameters are optional)
```javascript
new Clock({
  el: // HTML#Element to append Clock to (defaults to document.body)
  calculate_angle: // Function to return angle (in radians) based on time
  style: {
    view: {
      size: // Size of View, default: 200px
      border: {
        size: // Width of View border, default: 4px
        color: // Colour of View border, default: black
      }
    },
    hand: {
      size: // Width of Clock Hand, default: 2px
      color: // Colour of Clock Hand, default: red
    },
    clock: {
      size: // Size of Clock background image, default: 800px
      image: // Clock Background image (URL), default: SVG image of clock face
    }
  }
});
```
