var currentImage;
var preview = document.getElementById("previewArea");

// File
//--------------------------
function clearImage() {
    var preview = document.getElementById("previewArea")
    var context = preview.getContext("2d");
    context.clearRect(0, 0, preview.width, preview.height);
}

function setImage() {
    // Load image
    var imageFile = document.getElementById("imageUpload");
    currentImage = new SimpleImage(imageFile);
    // Draw
    currentImage.drawTo(preview);
}

// Painter
var colorList = {
    // RULE
    // "color": [r, g, b]
    "red": [255, 0, 0],
    "orange": [255, 128, 0],
    "yellow": [255, 255, 0],
    "green": [0, 255, 0],
    "blue": [0, 0, 255],
    "indigo": [75, 0, 130],
    "violet": [127, 255, 255],
    "gray": [128, 128, 128],
    "france_blue": [0, 85, 164],
    "france_white": [255, 255, 255],
    "france_red": [239, 65, 53],
}

function easyPainter(pixel, color) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var color_r = color[0];
    var color_g = color[1];
    var color_b = color[2];

    if (avg < 128) {
        pixel.setRed(2 * avg * color_r / 255);
        pixel.setGreen(2 * avg * color_g / 255);
        pixel.setBlue(2 * avg * color_b / 255);
    } else {
        pixel.setRed((255 - color_r) * (avg - 128) / 128 + color_r);
        pixel.setGreen((255 - color_g) * (avg - 128) / 128 + color_g);
        pixel.setBlue((255 - color_b) * (avg - 128) / 128 + color_b);
    }
}

// Filters
//--------------------------
function filterRed() {
    for (var pixel of currentImage.values()) {
        easyPainter(pixel, colorList["red"]);
    }
    currentImage.drawTo(preview);
}

function filterGray() {
    for (var pixel of currentImage.values()) {
        easyPainter(pixel, colorList["gray"]);
    }
    currentImage.drawTo(preview);
}

function filterFrance() {
    var width = currentImage.getWidth();
    for (var pixel of currentImage.values()) {
        var x = pixel.getX();
        if (x < width / 3)
            easyPainter(pixel, colorList["france_blue"]);
        else if (x < width * 2 / 3)
            easyPainter(pixel, colorList["france_white"]);
        else
            easyPainter(pixel, colorList["france_red"]);
    }
    currentImage.drawTo(preview);
}

function filterRainbow() {
    var height = currentImage.getHeight();
    for (var pixel of currentImage.values()) {
        var y = pixel.getY();
        if (y < height / 7)
            easyPainter(pixel, colorList["red"]);
        else if (y < height * 2 / 7)
            easyPainter(pixel, colorList["orange"]);
        else if (y < height * 3 / 7)
            easyPainter(pixel, colorList["yellow"]);
        else if (y < height * 4 / 7)
            easyPainter(pixel, colorList["green"]);
        else if (y < height * 5 / 7)
            easyPainter(pixel, colorList["blue"]);
        else if (y < height * 6 / 7)
            easyPainter(pixel, colorList["indigo"]);
        else
            easyPainter(pixel, colorList["violet"]);
    }
    currentImage.drawTo(preview);
}