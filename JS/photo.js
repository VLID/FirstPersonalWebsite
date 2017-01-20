function hoverOverPhoto(element)
{
    var title = document.createElement("p");
    title.innerHTML = element.alt;
    title.className = "photoTitle";
    title.id = "title";
    element.style.opacity = 0;
    element.parentNode.appendChild(title);
}


function overOffPhoto(element)
{
    var title = document.getElementById("title");
    title.parentNode.removeChild(title);
    element.style.opacity = 1;
}

function thumbnailView(element)
{
    var photo = document.getElementById("photoFull");
    var photo_div = document.getElementById("photoFullDiv");
    photo.src = element.src;
    photo.alt = element.alt;
    photo_div.style.width = window.innerWidth;
    photo_div.style.height = window.innerHeight;
    photo_div.style.visibility = "visible";
}

function fullPhotoClick()
{
    var photo_div = document.getElementById("photoFullDiv");
    photo_div.style.visibility = "hidden";
}