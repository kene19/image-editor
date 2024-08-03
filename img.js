let filA = document.getElementById("hue-rotate");
let filb = document.getElementById("brightness");
let filc = document.getElementById("blur");
let fild = document.getElementById("contrast");
let file = document.getElementById("saturate");
let filf = document.getElementById("sepia");
let filg = document.getElementById("grayscale");
let filh = document.getElementById("opacity");
let filpi = document.getElementById("invert");
let rotateop = document.querySelectorAll(".rottet-op button");
let rotate = 0;
let flipX = 1, flipY = 1;
let uplode = document.querySelector("#uplode");
let img_src = document.querySelector("#img-src");
let Save_image = document.querySelector(".Save-image");
let con = document.querySelector(".con");
let fillterbox = document.querySelector(".fillterbox");
let rot = document.querySelector(".rot");

function my1() {
    fillterbox.style.display = "flex";
    rot.style.display = "none";
}

function my2() {
    fillterbox.style.display = "none";
    rot.style.display = "flex";
}

function resetfil() {
    filA.value = "0";
    filb.value = "100";
    filc.value = "0";
    fild.value = "100";
    file.value = "100";
    filf.value = "0";
    filg.value = "0";
    filh.value = "1";
    filpi.value = "0";
    rotate = 0;
    flipX = 1;
    flipY = 1;
    img_src.style.transform = "rotate(0deg) scale(1,1)";
    addfill();
}

uplode.onchange = () => {
    resetfil();
    document.querySelector(".img-con").style.display = "block";

    let red = new FileReader();
    red.readAsDataURL(uplode.files[0]);
    red.onload = () => {
        img_src.setAttribute("src", red.result);
    };
}

let sliders = document.querySelectorAll(".filter input[type='range']");

sliders.forEach(slider => {
    slider.addEventListener("input", addfill);
});

function addfill() {
    img_src.style.filter = `hue-rotate(${filA.value}deg) brightness(${filb.value}%) blur(${filc.value}px) contrast(${fild.value}%) saturate(${file.value}%) sepia(${filf.value}%) grayscale(${filg.value}) opacity(${filh.value}) invert(${filpi.value}%)`;
}

rotateop.forEach(opption => {
    opption.addEventListener("click", () => {
        if (opption.id === "left") {
            rotate -= 90;
        } else if (opption.id === "right") {
            rotate += 90;
        } else if (opption.id === "flipx") {
            flipX = flipX === 1 ? -1 : 1;
        } else if (opption.id === "flipy") {
            flipY = flipY === 1 ? -1 : 1;
        } else {
            rotate = 0;
            flipX = 1;
            flipY = 1;
        }
        img_src.style.transform = `rotate(${rotate}deg) scale(${flipX},${flipY})`;
    });
});

let saveImage = () => {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let img = new Image();
    img.src = img_src.src;

    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Apply filters
        ctx.filter = `hue-rotate(${filA.value}deg) brightness(${filb.value}%) blur(${filc.value}px) contrast(${fild.value}%) saturate(${file.value}%) sepia(${filf.value}%) grayscale(${filg.value}) opacity(${filh.value}) invert(${filpi.value}%)`;

        // Apply transformations
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotate * Math.PI / 180);
        ctx.scale(flipX, flipY);
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        // Save the canvas as an image
        let link = document.createElement("a");
        link.download = 'edited-image.png';
        link.href = canvas.toDataURL();
        link.click();
    };
};

Save_image.addEventListener("click", saveImage);
