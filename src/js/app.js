document.addEventListener("DOMContentLoaded", function() {
    iniciarApp()
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes")

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("PICTURE")
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imágen galería">
        `

        imagen.onclick = function() {
            navegacionFija()
            mostrarImagen(i)
            scrollNav()
        }
        
        galeria.appendChild(imagen)
    }
}

function navegacionFija(){
    const body = document.querySelector("body")
    const barra = document.querySelector("header")
    const sobreFestival = document.querySelector(".sobre-festival")

    window.addEventListener("scroll", function(){
        if(sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add("fijo")
            body.classList.add("body-scroll")
        } else{
            barra.classList.remove("fijo")
            body.classList.remove("body-scroll")
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll(".navegacion-principal a")

    enlaces.forEach( enlace => {
        enlace.addEventListener("click", function(e){
            e.preventDefault()
            
            const seccionScroll = e.target.attributes.href.value
            const seccion = document.querySelector(seccionScroll)
            seccion.scrollIntoView({behaviour:"smooth"})
        })
    })
}

function mostrarImagen(id) {
    const imagen = document.createElement("PICTURE")
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imágen galería">
    `

    // Crear overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay")

    // Cerrar al dar click en la pantalla
    overlay.onclick = function() {
        overlay.remove()
        const body = document.querySelector("body")
        body.classList.remove("fijar-body")
    }

    // Botón de cierre del modal
    const cerrarModal = document.createElement("P")
    cerrarModal.textContent = "X"
    cerrarModal.classList.add("btn-cerrar")

    cerrarModal.onclick = function() {
        overlay.remove()
        const body = document.querySelector("body")
        body.classList.remove("fijar-body")
    }

    overlay.appendChild(cerrarModal)

    // Ponerlo sobre el HTML
    const body = document.querySelector("body")
    body.appendChild(overlay)
    body.classList.add("fijar-body")
}