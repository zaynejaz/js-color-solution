// create a div and assign the div to a variable. Put an empty h1 and an input with a placeholder saying "Enter a Hex Color Code" inside of div 
var div = document.createElement('div');
div.innerHTML = '<h1></h1><input type="text" placeholder="Enter a Hex Color Code"/>';
document.body.appendChild(div);

// center the div
div.style.position = 'absolute';
div.style.left = '50%';
div.style.top = '50%';
div.style.transform = 'translate(-50%, -50%)';

// get he h1 text input. center align the h1 text. do not show the h1 text
var h1 = div.querySelector('h1');
h1.style.textAlign = 'center';
h1.style.display = 'none';

// get the input
var input = div.querySelector('input');
//remove input border and remove the outline
input.style.border = 'none';
input.style.outline = 'none';
// center the input text
input.style.textAlign = 'center';
// make font family apple default font and source sans pro the fallback font for the input text
input.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Source Sans Pro", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
// if screen width less is than 450px input font size is 22px but if it is greater than 450px input font size is 38px
if (window.innerWidth < 450) {
    input.style.fontSize = '22px';
} else {
    input.style.fontSize = '38px';
}
// add media query to change the input font size. if screen width less is than 450px input font size is 22px but if it is greater than 450px input font size is 38px
var mq = window.matchMedia("(max-width: 450px)");
mq.addListener(function (changed) {
    if (changed.matches) {
        input.style.fontSize = '22px';
    } else {
        input.style.fontSize = '38px';
    }
});
// make input background color transparent
input.style.backgroundColor = 'transparent';

// add an input event listener to the input
div.querySelector('input').addEventListener('input', function (e) {
    // store the input value in a variable
    var color = e.target.value;
    // check if the input value is a color
    if (color.match(/^#[0-9a-f]{6}$/i)) {
        // if it is a color, set the background color of the body to the input value
        document.body.style.backgroundColor = color;
        // set the input to a new color
        div.querySelector('input').style.color = getContrastingColor(color);
    } else {
        // if it us not, set the background color of the body to white
        document.body.style.backgroundColor = 'white';
        // set the input to black
        div.querySelector('input').style.color = 'black';
    }
});

// takes a hex color and returns the hex color of the opposite color on the color wheel
function getContrastingColor(hexColor) {
    // convert a hex color to rgb
    var rgb = hexToRgb(hexColor);
    // determine if the color is light or dark
    var isLight = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 125;
    // return the opposite color
    return isLight ? '#000000' : '#ffffff';
}

function hexToRgb(hex) {
    // convert a hex color to rgb
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// when user clicks on the body, copy the background color to the to the users clipboard
document.body.addEventListener('click', function () {
    copyToClipboard(document.body.style.backgroundColor);
});

