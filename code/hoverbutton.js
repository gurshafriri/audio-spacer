// Max/MSP V8UI Button Component built by GPT-5

// Global variables for button state
var buttonState = {
    isHovered: false,
    isPressed: false,
    width: 120,
    height: 40,
    x: 10,
    y: 10
};

// Color scheme
var colors = {
    background: [0.2, 0.2, 0.3, 1.0],
    backgroundHover: [0.25, 0.25, 0.4, 1.0],
    backgroundPressed: [0.15, 0.15, 0.25, 1.0],
    border: [0.4, 0.4, 0.5, 1.0],
    borderHover: [0.5, 0.5, 0.7, 1.0],
    text: [0.9, 0.9, 0.9, 1.0],
    textHover: [1.0, 1.0, 1.0, 1.0]
};

// Initialize the UI
function init() {
    // Set up the drawing context
    mgraphics.init();
    mgraphics.relative_coords = 0;
    mgraphics.autofill = 0;
    
    // Set initial size
    box.size(buttonState.width + 20, buttonState.height + 20);
}

// Main paint function
function paint() {
    var width = box.rect[2] - box.rect[0];
    var height = box.rect[3] - box.rect[1];
    
    // Clear background
    mgraphics.set_source_rgba(0, 0, 0, 0);
    mgraphics.rectangle(0, 0, width, height);
    mgraphics.fill();
    
    // Draw button
    drawButton(buttonState.x, buttonState.y, buttonState.width, buttonState.height);
}

// Draw the button with current state
function drawButton(x, y, w, h) {
    var cornerRadius = 6;
    
    // Determine colors based on state
    var bgColor = colors.background;
    var borderColor = colors.border;
    var textColor = colors.text;
    
    if (buttonState.isPressed) {
        bgColor = colors.backgroundPressed;
    } else if (buttonState.isHovered) {
        bgColor = colors.backgroundHover;
        borderColor = colors.borderHover;
        textColor = colors.textHover;
    }
    
    // Draw button background with rounded corners
    mgraphics.set_source_rgba(bgColor[0], bgColor[1], bgColor[2], bgColor[3]);
    drawRoundedRect(x, y, w, h, cornerRadius);
    mgraphics.fill();
    
    // Draw border
    mgraphics.set_source_rgba(borderColor[0], borderColor[1], borderColor[2], borderColor[3]);
    mgraphics.set_line_width(1.5);
    drawRoundedRect(x, y, w, h, cornerRadius);
    mgraphics.stroke();
    
    // Add subtle inner highlight when hovered
    if (buttonState.isHovered && !buttonState.isPressed) {
        mgraphics.set_source_rgba(1, 1, 1, 0.1);
        drawRoundedRect(x + 1, y + 1, w - 2, h - 2, cornerRadius - 1);
        mgraphics.fill();
    }
    
    // Draw text
    mgraphics.select_font_face("Arial");
    mgraphics.set_font_size(12);
    mgraphics.set_source_rgba(textColor[0], textColor[1], textColor[2], textColor[3]);
    
    var textWidth = mgraphics.text_measure("Slice by Onset")[0];
    var textX = x + (w - textWidth) / 2;
    var textY = y + h / 2 + 4; // Slight vertical adjustment
    
    mgraphics.move_to(textX, textY);
    mgraphics.show_text("Slice by Onset");
}

// Helper function to draw rounded rectangles
function drawRoundedRect(x, y, w, h, radius) {
    mgraphics.move_to(x + radius, y);
    mgraphics.line_to(x + w - radius, y);
    mgraphics.arc(x + w - radius, y + radius, radius, -Math.PI/2, 0);
    mgraphics.line_to(x + w, y + h - radius);
    mgraphics.arc(x + w - radius, y + h - radius, radius, 0, Math.PI/2);
    mgraphics.line_to(x + radius, y + h);
    mgraphics.arc(x + radius, y + h - radius, radius, Math.PI/2, Math.PI);
    mgraphics.line_to(x, y + radius);
    mgraphics.arc(x + radius, y + radius, radius, Math.PI, 3*Math.PI/2);
    mgraphics.close_path();
}

// Mouse event handlers
function onclick(x, y, button, cmd, shift, capslock, option, ctrl) {
    if (isPointInButton(x, y)) {
        buttonState.isPressed = true;
        mgraphics.redraw();
        
        // Send bang to outlet after short delay for visual feedback
        var task = new Task(function() {
            buttonState.isPressed = false;
            mgraphics.redraw();
            outlet(0, "bang");
        });
        task.schedule(50); // 50ms delay
    }
}

function onidleout() {
    if (buttonState.isHovered) {
        buttonState.isHovered = false;
        mgraphics.redraw();
    }
}

function onidle(x, y) {
    var wasHovered = buttonState.isHovered;
    buttonState.isHovered = isPointInButton(x, y);
    
    if (wasHovered !== buttonState.isHovered) {
        mgraphics.redraw();
    }
}

// Helper function to check if point is inside button
function isPointInButton(x, y) {
    return (x >= buttonState.x && 
            x <= buttonState.x + buttonState.width && 
            y >= buttonState.y && 
            y <= buttonState.y + buttonState.height);
}

// Resize handler
function onresize(w, h) {
    // Center button in the available space
    buttonState.x = (w - buttonState.width) / 2;
    buttonState.y = (h - buttonState.height) / 2;
    mgraphics.redraw();
}

// Message handlers for Max
function msg_int(value) {
    // Handle integer messages if needed
    post("Button received integer: " + value + "\n");
}

function msg_float(value) {
    // Handle float messages if needed
    post("Button received float: " + value + "\n");
}

// Function to change button label dynamically
function setlabel(newLabel) {
    if (arguments.length > 0) {
        // Store the new label (you'd need to modify drawButton to use this)
        buttonLabel = newLabel.toString();
        mgraphics.redraw();
    }
}

// Initialize when loaded
init();