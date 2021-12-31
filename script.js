// create a div with and h1 and put an input inside of it
var div = document.createElement('div');
div.innerHTML = '<h1></h1><input type="text" placeholder="Type in a hex color code"/>';
document.body.appendChild(div);

// center the div
div.style.position = 'absolute';
div.style.left = '50%';
div.style.top = '50%';
div.style.transform = 'translate(-50%, -50%)';

// center align the h1 text
var h1 = div.querySelector('h1');
h1.style.textAlign = 'center';

//remove input border
var input = div.querySelector('input');
input.style.border = 'none';
input.style.outline = 'none';
input.style.textAlign = 'center';
input.style.fontSize = '40px';
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