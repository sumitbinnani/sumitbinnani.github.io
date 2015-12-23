$.stellar({
  // Set scrolling to be in either one or both directions
  horizontalScrolling: true,
  verticalScrolling: true,

  // Set the global alignment offsets
  horizontalOffset: 0,
  verticalOffset: 0,

  // Refreshes parallax content on window load and resize
  responsive: false,

  // Select which property is used to calculate scroll.
  // Choose 'scroll', 'position', 'margin' or 'transform',
  // or write your own 'scrollProperty' plugin.
  scrollProperty: 'scroll',

  // Select which property is used to position elements.
  // Choose between 'position' or 'transform',
  // or write your own 'positionProperty' plugin.
  positionProperty: 'position',

  // Enable or disable the two types of parallax
  parallaxBackgrounds: true,
  parallaxElements: true,

  // Hide parallax elements that move outside the viewport
  hideDistantElements: true,

  // Customise how elements are shown and hidden
  hideElement: function($elem) { $elem.hide(); },
  showElement: function($elem) { $elem.show(); }
});


var settings = {
//height of sphere container
height: 200,
//width of sphere container
width: 600,
//radius of sphere
radius: 200,
//rotation speed
speed: 0.6,
//sphere rotations slower
slower: 0.9,
//delay between up<a href="http://www.jqueryscript.net/time-clock/">date</a> position
timer: 5,
//dependence of a font size on axis Z
fontMultiplier: 15,
//tag css stylies on mouse over
hoverStyle: {
border: 'none',
//color: '#0b2e6f'
},
//tag css stylies on mouse out
mouseOutStyle: {
border: '',
color: ''
}
};

$(document).ready(function(){
$('#tagcloud').tagoSphere(settings);
});