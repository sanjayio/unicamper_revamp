'use strict';

$(function() {
  var snapSlider = document.getElementById('slider-snap');

  noUiSlider.create(snapSlider, {
    start: [
      parseInt(localStorage.getItem('price_0'))
        ? parseInt(localStorage.getItem('price_0'))
        : 0,
      parseInt(localStorage.getItem('price_1'))
        ? parseInt(localStorage.getItem('price_1'))
        : 100
    ],
    snap: false,
    connect: true,
    padding: [15, 0],
    step: 1,
    range: {
      min: -15,
      max: 100
    }
  });
  var snapValues = [
    document.getElementById('slider-snap-value-from'),
    document.getElementById('slider-snap-value-to')
  ];
  var inputValues = [
    document.getElementById('slider-snap-input-from'),
    document.getElementById('slider-snap-input-to')
  ];
  snapSlider.noUiSlider.on('update', function(values, handle) {
    snapValues[handle].innerHTML = values[handle];
    inputValues[handle].value = values[handle];
    //console.log(handle + ', ' + values[handle]);
    localStorage.setItem('price_' + handle, values[handle]);
  });
});
