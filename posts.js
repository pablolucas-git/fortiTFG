const posts = [{
    header: {
        foto: "perfil3.webp",
        nombre: "Eric Schmitt"
    },
    contenido: {
        texto: 'Primera pieza de una personal tetralogía que he decidido leer estos días ambientada en el entorno cruel y atroz, pero no bélico, de la II GM. Odette Elina, miembro de la resistencia francesa, cayó en manos de la Gestapo, que la deportó a Auschwitz pocos meses antes de la liberación del campo. Ahí se gestó esta versión breve -brevísima-, minimalista, impresionista... y en femenino, de aquel "Si esto es un hombre", de Primo Levi (1° parte de la "Trilogía de Auschwitz"). Ambos testimonios desgarran a jirones el recuerdo de semejante barbarie contra la humanidad que aún hoy algunos (muchos) ya no solo niegan, sino que ensalzan y justifican. 《Me habría gustado "comprar" una manzana. Pero hasta la más pequeña costaba dos raciones de pan.》 ================= 《Era una noche pura de septiembre. Los crematorios estaban cargados hasta reventar de combustible humano. Si fuera razonable, no debería mantener la esperanza de sobrevivir; pero una especie de presentimiento, contra toda razón, me hace esperar》',
        imagen: "publicacion1.jfif"
    },
    comentarios: [{
        foto: "perfil3.webp",
        nombre: "Silvia Ruiz",
        texto: "Me encanta este libro, lo leí hace unos años y me impactó mucho. Me gustaría leer la tetralogía que mencionas, ¿la has leído ya?"
    },
    {
        foto: "perfil1.jpg",
        nombre: "Juan Carlos",
        texto: "¡Qué interesante! Me encantaría leerlo, ¿dónde lo conseguiste? ¿Lo venden en librerías? Mi abuela me contaba que en la guerra ella y su familia tuvieron que esconderse en un sótano y vivir de lo que encontraban en los basureros. ¡Qué horror! ¡Qué suerte que no vivimos en esos tiempos!"
    }]
},
{
    header: {
        foto: "perfil2.jpg",
        nombre: "María Fernández"
    },
    contenido: {
        texto: 'Hoy he terminado de leer "El hombre que amaba a los perros", de Leonardo Padura. Es una novela que narra la historia de un periodista cubano que, tras la caída del comunismo, se ve obligado a emigrar a Estados Unidos. Allí, en el exilio, se encuentra con un viejo amigo que le cuenta la historia de su vida, desde su infancia en Cuba hasta su exilio en Estados Unidos. Es una novela que me ha gustado mucho, porque me ha permitido conocer un poco más la historia de Cuba y de su gente. Además, me ha parecido muy interesante la forma en la que el autor ha narrado la historia, a través de la voz de un periodista que, como todos los periodistas, tiene una visión muy crítica de la realidad. 《La vida es una historia que se cuenta, y la historia es una vida que se cuenta》',
        imagen: "publicacion2.jpg"
    },
    comentarios: [{
        foto: "perfil1.jpg",
        nombre: "Juan Carlos",
        texto: "¡Qué interesante! Me encantaría leerlo, ¿dónde lo conseguiste? ¿Lo venden en librerías? Mi abuela me contaba que en la guerra ella y su familia tuvieron que esconderse en un sótano y vivir de lo que encontraban en los basureros. ¡Qué horror! ¡Qué suerte que no vivimos en esos tiempos!"
    },
    {
        foto: "perfil3.webp",
        nombre: "Silvia Ruiz",
        texto: "Me encanta este libro, lo leí hace unos años y me impactó mucho. Me gustaría leer la tetralogía que mencionas, ¿la has leído ya?"
    },
    {
        foto: "perfil2.jpg",
        nombre: "María Fernández",
        texto: "¡Qué interesante! Me encantaría leerlo, ¿dónde lo conseguiste? ¿Lo venden en librerías? Mi abuela me contaba que en la guerra ella y su familia tuvieron que esconderse en un sótano y vivir de lo que encontraban en los basureros. ¡Qué horror! ¡Qué suerte que no vivimos en esos tiempos!"
    }]
}];


document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {
        crearPosts();
        reducirPosts();
    }
});


function reducirPosts() {

    let posts = document.getElementsByClassName("post");
    for (post of posts) {
        let textos = post.getElementsByClassName("texto");

        for (texto of textos) {
            if (texto.getElementsByTagName("p")[0].offsetHeight > 100) {
                texto.getElementsByTagName("p")[0].style.height = "100px";
                texto.getElementsByTagName("p")[0].style.overflow = "hidden";
                texto.innerHTML += "<button>Leer más</button>";
                texto.getElementsByTagName("button")[0].addEventListener("click", function () {
                    this.previousElementSibling.style.height = "auto";
                    this.previousElementSibling.style.overflow = "visible";
                    this.remove();
                });
            }
        }
    
        let comentarios = post.getElementsByClassName("comentario");
        if (comentarios.length >= 1) {
            for (let i = 1; i < comentarios.length; i++) {
                comentarios[i].style.display = "none";
            }
            comentarios[0].parentElement.innerHTML += "<button>Ver más comentarios</button>";
            comentarios[0].parentElement.getElementsByTagName("button")[0].addEventListener("click", function () {
                for (comentario of comentarios) {
                    comentario.style.display = "flex";
                }
                this.remove();
            });
        }
    }





}



function crearPosts() {
    publicaciones = document.getElementById("publicaciones");
    for (post of posts) {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");


        let header = document.createElement("header");

        let foto = document.createElement("img");
        foto.src = "imgs/" + post.header.foto;

        let nombre = document.createElement("p");
        nombre.textContent = post.header.nombre;

        header.appendChild(foto);
        header.appendChild(nombre);
        postDiv.appendChild(header);


        let contenido = document.createElement("div");
        contenido.classList.add("contenido");

        let textoDiv = document.createElement("div");
        textoDiv.classList.add("texto");
        let texto = document.createElement("p");
        texto.textContent = post.contenido.texto;
        textoDiv.appendChild(texto);
        contenido.appendChild(textoDiv);
        if (post.contenido.imagen != null) {
            let imagenDiv = document.createElement("div");
            imagenDiv.classList.add("imagen");

            let imagen = document.createElement("img");
            imagen.src = "imgs/" + post.contenido.imagen;
            imagenDiv.appendChild(imagen);
            contenido.appendChild(imagenDiv);
        }


        postDiv.appendChild(contenido);


        let acciones = document.createElement("div");
        acciones.classList.add("acciones");
        let megusta = document.createElement("button");
        megusta.classList.add("megusta");
        megusta.textContent = "Me gusta";
        let comentar = document.createElement("button");
        comentar.classList.add("comentar");
        comentar.textContent = "Comentar";
        let compartir = document.createElement("button");
        compartir.classList.add("compartir");
        compartir.textContent = "Compartir";

        acciones.appendChild(megusta);
        acciones.appendChild(comentar);
        acciones.appendChild(compartir);

        postDiv.appendChild(acciones);

        if (post.comentarios != null) {
            let comentarios = document.createElement("div");
            comentarios.classList.add("comentarios");
            for (comentario of post.comentarios) {
                let comentarioDiv = document.createElement("div");
                comentarioDiv.classList.add("comentario");

                let foto = document.createElement("img");
                foto.src = "imgs/" + comentario.foto;

                let comentarioContenido = document.createElement("div");
                comentarioContenido.classList.add("comentario-contenido");

                let nombre = document.createElement("p");
                nombre.textContent = comentario.nombre;

                let textoComentario = document.createElement("p");
                textoComentario.classList.add("textoComentario");
                textoComentario.textContent = comentario.texto;

                comentarioContenido.appendChild(nombre);
                comentarioContenido.appendChild(textoComentario);

                comentarioDiv.appendChild(foto);
                comentarioDiv.appendChild(comentarioContenido);
                comentarios.appendChild(comentarioDiv);
            }
            postDiv.appendChild(comentarios);
        }
        publicaciones.appendChild(postDiv);

    }
}