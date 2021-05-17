 //Variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



 //Event Listener
 eventListeners();

 function eventListeners(){
    //  Cuando el usuario agrega un nuevo tweet
 formulario.addEventListener('submit', agregarTweet)
  // cuando el docuemnto esta listo 
  document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets') || [] );

        console.log(tweets)

        crearHTML();
  }); 
 }




//  Funciones

function agregarTweet(e){
e.preventDefault();

const tweet = document.querySelector('#tweet').value;
//Validacion 
if (tweet === '') {
     mostrarError('Un mensaje no puede ir vacio');

    return;
   } 

   const tweetsObj ={
       id:Date.now(),
         tweet  //=> esto es igual a tweet: tweet
   }


   //Añadir al arreglo de tweets

   tweets = [...tweets,tweetsObj];

   crearHTML();

   //Reiniciar el formulario

   formulario.reset();
   
 }

 function mostrarError(error){
  const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error'); //clase que esta en css

       const contenido = document.querySelector('#contenido');
       contenido.appendChild(mensajeError);
       //Elimina alerta
       setTimeout(() => {
           mensajeError.remove();
      }, 2000);

 }


 function crearHTML(){
        
    limpiarHTML(); //se limpia primero el html

     if (tweets.length >= 0) {
         tweets.forEach( tweet => {
             
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //Funcion de eliminar
                btnEliminar.onclick = () =>{ borrarTweet(tweet.id);
                }

            //  Crear HTML
             const li = document.createElement('li');
            //  Añadir el texto
             li.textContent = tweet.tweet;
 
            //  Asignar el boton 
             li.appendChild(btnEliminar);


            //  Insentar en el HTML
              listaTweets.appendChild(li); 
         });
     }

     sicronizarStorage();
 }

//Agrega los tweets actuales a localeStorage
 function  sicronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));

 }


 function borrarTweet(id){
       tweets = tweets.filter( tweet => tweet.id !== id);

    crearHTML();

 }


 //LIMPIAR HTML

 function limpiarHTML(){
     while(listaTweets.firstChild){
       listaTweets.removeChild(listaTweets.firstChild);
     }
 }