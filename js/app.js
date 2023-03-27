// VARIABLES
const formulario = document.querySelector("#formulario")
const listaTweets = document.querySelector("#lista-tweets")
let tweets = []

// EVENT LISTENERS
eventListeners()
function eventListeners() {
  formulario.addEventListener("submit", agregarTweet)

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || []

    crearHTML()
  })
}

// FUNCIONES

function agregarTweet(e) {
  e.preventDefault()
  const tweet = document.querySelector("#tweet").value

  //validacion
  if (tweet === "") {
    mostrarError("El tweet no puede ir vacío")
    return
  }
  const tweetObj = {
    id: Date.now(),
    tweet
  }

  tweets = [...tweets, tweetObj]

  crearHTML()
  formulario.reset()
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("P")
  mensajeError.textContent = mensaje
  mensajeError.classList.add("error")

  const contenido = document.querySelector("#contenido")
  contenido.appendChild(mensajeError)

  setTimeout(() => {
    mensajeError.remove()
  }, 3000);
}

function crearHTML() {
  limpiarHTML()

  if (tweets.length > 0) {

    tweets.forEach(tweet => {
      const btnEliminar = document.createElement("A")
      btnEliminar.classList.add("borrar-tweet")
      btnEliminar.innerHTML = "X"

      btnEliminar.onclick = () => {
        borrarTweet(tweet.id)
      }
      const li = document.createElement("LI")
      li.innerText = tweet.tweet
      li.appendChild(btnEliminar)

      listaTweets.appendChild(li)
    })
  }

  sincronizarStorage()
}

function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets))
}

function borrarTweet(id) {
  tweets = tweets.filter(tweet => tweet.id !== id)

  crearHTML()
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild)
  }
}


