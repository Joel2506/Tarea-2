

  



  window.addEventListener('load', ()=> { /*escuchamos cuando se carga el documento*/

    /* creamos dos constantes y no guardamos los elementos*/
    const display = document.querySelector('.calculator-display');
    const keypadButtons = document.getElementsByClassName('keypad-button');
    

    /* Creamos otra constante para convertir el HTMLCollection a Array */
    const keypadButtonsArray = Array.from(keypadButtons);

    /* Iteramos por nuestro nueva array de botones */
    keypadButtonsArray.forEach( (button) => {

        /* A cada boton le agregamos un listener */
        button.addEventListener('click', ()=> {
            calculadora(button, display);
        })
    })

    //Agregando las funciones al boton de eliminar regitros.
    const deleteButton = document.querySelector('.eliminar_registros');
    deleteButton.addEventListener('click', ()=> {
        eliminarResultList();
        actualizar_registros();
    });

    actualizar_registros();
});

function calculadora(button, display){
    switch (button.innerHTML){
        case 'C':
            borrar(display);
            break;

        case '=':
            calcular(display);
            actualizar_registros();
            break;

        default:
            actualizar(display, button);
            break;
    }
}

function calcular(display){
    display.innerHTML = eval(display.innerHTML)
    addResultado(display.innerHTML);
    // guardar_localStorage(display.innerHTML);
}

function actualizar(display, button){
    if (display.innerHTML == 0){
        display.innerHTML = '';
    }
    display.innerHTML += button.innerHTML;
}

function borrar(display){
    display.innerHTML = 0;
}


// logica para guardar en el localStorage. 

// creando la variable para almacenar mi lista. 
var resultsList = [];
var resultDisplay = [];

//-----------------------------------------------------------------------------------
function actualizar_registros(){
    var display_resultados = document.querySelector('.registro-results');

    //var arreglos_resultados = JSON.parse(localStorage.getItem('LocalResultsList'));

    display_resultados.innerHTML = getResultsList();
}
//-----------------------------------------------------------------------------------

// creating a function to my results. 
function addResultado(resultado){
    var newResultado = {
        resultado: resultado
    };

    //adding my results
    resultDisplay.push(newResultado['resultado'])
     
    console.log(newResultado);
    resultsList.push(newResultado);
    localStorageResultList(resultDisplay);
}

// this function return the results list like array.
function getResultsList(){
    var storedList = localStorage.getItem('LocalResultsList');
    if(storedList !== null){
        resultsList = JSON.parse(storedList);
    }
    return resultsList;
}

// add an Item to localStorage and doing a conversion on type data that receive.
function localStorageResultList(results){
    localStorage.setItem('LocalResultsList', JSON.stringify(results));
}

// remove Items from localStorage.
function eliminarResultList(){
    localStorage.removeItem('LocalResultsList');
}
 