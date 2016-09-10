document.addEventListener('DOMContentLoaded', function() {
    var canvasModButton = document.getElementById('canvasModButton');
    var pixelContainer = document.getElementById('pixelContainer');
    var resetButton = document.getElementById('resetButton');
    var mousingDown = false;
    //
    // window.addEventListener('mousedown', switchMouseState);
    // window.addEventListener('mouseup', switchMouseState);
    // canvasModButton.addEventListener('click', openCanvasModal);
    // pixelContainer.addEventListener('mouseover', setPixelColor);
    // pixelContainer.addEventListener('click', setPixelColor);
    // resetButton.addEventListener('click', resetPixels);
    //
    // //Updates mousingDown to reflect whether the mouse is being clicked
    //Takes the event object as a parameter
    function switchMouseState(event) {
        mousingDown = event.type === 'mousedown';
    }

    //Brings up the canvas Modal and assigns event listeners to its elements
    function openCanvasModal() {
        var modal = document.getElementById('sizeChangeModal');

        modal.style.display = 'block';
        //
        // var closeButton = document.getElementById('close');
        // var pixelModButton = document.getElementById('pixelModButton');
        var inputs = document.getElementsByTagName('input');

        var specInputs = {
            'percentOfScreenInput': document.getElementById('percentOfScreenInput'),
            'colsInput': document.getElementById('colsInput')
        };

        var atLeastOneBlankInput = true;

        for (i = 0; i < inputs.length; i++) {
            inputs[i].onkeydown = setInputToNumbers(atLeastOneBlankInput, specInputs, pixelModButton);
        }

        closeButton.onclick = closeModal(modal);
        pixelModButton.onclick = setPixelSpecs(specInputs, modal);
    }

    function closeModal(modal) {
        return function(event) {
            modal.style.display = 'none';
        }
    }

    //
    function setInputToNumbers(atLeastOneBlankInput, specInputs, pixelModButton) {
        return function(event) {
            event.preventDefault();
            if (event.keyCode >= 48 && event.keyCode <= 57) {
                event.target.value += event.key;
            } else if (event.keyCode === 8) {
                event.target.value = event.target.value.slice(0, -1);
            }
            if (atLeastOneBlankInput || event.keyCode === 8) {
                atLeastOneBlankInput = false;
                for (var spec in specInputs) {
                    var currentTextInput = specInputs[spec].value;
                    var currentNumInput = parseInt(currentTextInput);
                    if (currentTextInput === '' || currentNumInput < 1 || currentNumInput > 100) {
                        atLeastOneBlankInput = true;
                    }
                }
                pixelModButton.disabled = atLeastOneBlankInput;
            }
        }
    }

    //Creates a new canvas with the specifications given by the user
    //Takes the % of screen and # columns
    //Puts an error message at the bottom of the modal if not all of the specs are
    //whole numbers
    function setPixelSpecs(specInputs, modal) {
        return function(event) {
            var percentOfScreenInput = specInputs['percentOfScreenInput'].value;
            var numCols = specInputs['colsInput'].value;
            var pixelWidthAndHeight = 100 / numCols;
            var numPixelsDesired = Math.pow(numCols, 2);
            var numPixelsCurrently = pixelContainer.childElementCount;
            var pixelDifference = numPixelsDesired - numPixelsCurrently;
            var numPixelsToAdjust = Math.abs(pixelDifference);

            for (i = 0; i < numPixelsToAdjust; i++) {
                if (pixelDifference > 0) {
                    var pixel = document.createElement('div');
                    pixel.className = 'pixel';
                    pixel.style.width = pixelWidthAndHeight + '%';
                    pixel.style.paddingBottom = pixelWidthAndHeight + '%';
                    pixel.style.borderTop = 'none';
                    if ((i + numPixelsCurrently + 1) % numCols === 0) {
                        pixel.style.borderRight = 'solid 1px';
                    } else {
                        pixel.style.borderRight = 'none';
                    }
                    pixelContainer.appendChild(pixel);
                } else if (pixelDifference < 0) {
                    var lastChild = pixelContainer.lastChild;
                    lastChild.removeEventListener('mouseover', function() {});
                    pixelContainer.removeChild(pixelContainer.lastChild);
                }
            }

            var pixels = pixelContainer.children;
            for (i = 0; i < pixels.length - numPixelsToAdjust; i++) {
                pixels[i].className = 'pixel';
                if (i <= numCols - 1) {
                    pixels[i].style.borderTop = 'solid 1px';
                } else {
                    pixels[i].style.borderTop = 'none';
                }
                if ((i + 1) % numCols === 0) {
                    pixels[i].style.borderRight = 'solid 1px';
                }
                pixels[i].style.width = pixelWidthAndHeight + '%';
                pixels[i].style.paddingBottom = pixelWidthAndHeight + '%';
            }

            pixelContainer.style.width = percentOfScreenInput + '%';

            modal.style.display = 'none';
        }
    }

    //Sets the pixel color of the pixel over which the mouse is dragging
    function setPixelColor(event) {
        if (event.type === 'click') {
            event.target.style.backgroundColor = 'red';
        } else if (mousingDown) {
            event.target.style.backgroundColor = 'red';
        }
    }

    //Resets all pixels to be blank
    function resetPixels(event) {
        var pixels = pixelContainer.children;
        for (i = 0; i < pixels.length; i++) {
            pixels[i].style.backgroundColor = '';
        }
    }
})
