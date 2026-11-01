// ==========================================
// CREATE PORTRAIT CANVAS
// ==========================================

const canvas = new fabric.Canvas("canvas", {
    width: 600,
    height: 800,
    backgroundColor: "#ffffff",
    preserveObjectStacking: true,
    selection: true
});


// ==========================================
// UPLOAD IMAGE
// ==========================================

const imageUpload = document.getElementById("imageUpload");

imageUpload.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        fabric.Image.fromURL(e.target.result, function(img) {

            const maxWidth = 540;
            const maxHeight = 740;

            const scaleX = maxWidth / img.width;
            const scaleY = maxHeight / img.height;

            const scale = Math.min(scaleX, scaleY, 1);

            img.set({
                scaleX: scale,
                scaleY: scale,

                left: (canvas.width - img.width * scale) / 2,
                top: (canvas.height - img.height * scale) / 2,

                selectable: true,
                evented: true,

                // Shows selection controls
                hasControls: true,
                hasBorders: true,

                lockUniScaling: false
            });

            canvas.add(img);

            // IMPORTANT:
            // Make the uploaded image the selected object
            canvas.setActiveObject(img);

            img.setCoords();

            canvas.requestRenderAll();

        });

    };

    reader.readAsDataURL(file);

});


// ==========================================
// ADD TEXT
// ==========================================

document.getElementById("addText").addEventListener("click", function() {

    const text = new fabric.IText("Edit this text", {

        left: 100,
        top: 100,

        fontSize: 30,

        fill: "#000000",

        selectable: true,
        evented: true,

        hasControls: true,
        hasBorders: true
    });

    canvas.add(text);

    canvas.setActiveObject(text);

    text.enterEditing();

    canvas.requestRenderAll();

});


// ==========================================
// DELETE OBJECT
// ==========================================

document.getElementById("deleteObject").addEventListener("click", function() {

    const selectedObject = canvas.getActiveObject();

    if (selectedObject) {

        canvas.remove(selectedObject);

        canvas.discardActiveObject();

        canvas.requestRenderAll();
    }

});


// ==========================================
// CLEAR CANVAS
// ==========================================

document.getElementById("clearCanvas").addEventListener("click", function() {

    canvas.clear();

    canvas.backgroundColor = "#ffffff";

    canvas.requestRenderAll();

});


// ==========================================
// DOWNLOAD
// ==========================================

document.getElementById("download").addEventListener("click", function() {

    const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1
    });

    const link = document.createElement("a");

    link.href = dataURL;
    link.download = "edited-image.png";

    link.click();

});


// ==========================================
// SHOW SELECTED OBJECT
// ==========================================

canvas.on("selection:created", function(event) {

    console.log("Selected:", event.selected[0]);

});

canvas.on("selection:updated", function(event) {

    console.log("Selected:", event.selected[0]);

});