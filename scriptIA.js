window.onload = function(){

    let casillas = document.getElementsByClassName("casilla");
    for(let i=0; i<casillas.length; i++){
        casillas[i].addEventListener("click", movimiento);
    }
    casillas[27].removeEventListener("click", movimiento);
    casillas[28].removeEventListener("click", movimiento);
    casillas[35].removeEventListener("click", movimiento);
    casillas[36].removeEventListener("click", movimiento);


    
    //fichas[27] = 1;
    //fichas[28] = 2;
    //fichas[35] = 2;
    //fichas[36] = 1;
    let posC=0;
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            if(posC === 27 || posC === 36)
                fichas[i][j] = 1;
            else if(posC === 28 || posC === 35)
                fichas[i][j] = 2;

            posC++;
        }
    }

        HayMovimientos(turno, fichas);

        let xd =0;
        for(let i=0; i<8; i++){
                for(let j=0; j<8; j++){
                    if(fichas[i][j] ===3){
                        console.log(fichas[i][j] + " X: "+ j + " Y: "+i)
                        casillas[xd].classList.add('pista');
                    }
                    xd++;

                }
        }



    let k=0;
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            juego[i][j] = casillas[k];
            k++;
        }
    }




}



var juego = new Array(8);
    
    
for(let i = 0; i <juego.length; i++){
    juego[i] = new Array(8);
}


//let fichas = [].fill.call({ length: 63 }, 0);; //valor de fichas en casillas 0 vacio, blancos 1, negros 2
let turno = true;
let ficha;
let claseFicha = " ";
let fichaJugada = [27,28,35,36];
let vuelta = 0;
let aux=true;

let fichas = new Array(8);
for (var i = 0; i < 8; i++) {
  fichas[i] = new Array(8);

}

for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
        fichas[i][j] = 0;
    }
}

let pista;
// 27 28 35 26
////


//////
""
var turnoJugar = document.getElementsByClassName('turno');
turnoJugar[0].innerText = "Juegan: Blancas";


var puntajeBlancas = document.getElementsByClassName('puntajes__blancas');
var puntajeNegras = document.getElementsByClassName('puntajes__negras');
let conBlancas = 2;
let conNegras = 2;


puntajeBlancas[0].innerText = "Blancas(Jugador): "+conBlancas;
puntajeNegras[0].innerText = "Negras(PC): "+conNegras;

var ganador = document.getElementsByClassName('ganador');

var xIA = 0;
var yIA = 0;

/////

var PaseTurnoB; 
var PaseTurnoN;

////

function movimiento(event){

     conBlancas = 0;
     conNegras = 0;

     ///////
  

     //console.log(event.target.id)

     let clickPos = false;
     for(let i =0; i< 8; i++){
        for(let j=0; j<8; j++){
            if(juego[i][j].id === event.target.id){
               if(fichas[i][j] === 3){
                clickPos= true;
               }
            }

        }
     }


        if(event.target.id && clickPos){
            PaseTurnoB = true;
            PaseTurnoN = false;
            if(turno){
                //console.log("blancas "+event.target.id);
                ficha = document.createElement("div");
                //var content= document.createTextNode("blancas");
                //ficha.appendChild(content);
                ficha.classList.add('ficha_blanca');
                event.target.appendChild(ficha);
               //   console.log(event.target.querySelector('div').classList.value)
                fichaJugada.push(parseInt(event.target.id));
                //fichas[event.target.id] = 1;
                let posC=0;
                for(let i=0; i<8; i++){
                    for(let j=0; j<8; j++){
                        if(posC == event.target.id){
                            fichas[i][j] = 1;
                           juego[i][j].classList.remove('pista');
                           cambiar(turno, i, j, fichas, juego);
                        }
                        
                        
                        posC++;
                    }
                }

            }
            /*else if(!turno){
               //   console.log("negras "+event.target.id);
                ficha = document.createElement("div");
                //var content= document.createTextNode("negras");
                //ficha.appendChild(content);
                ficha.classList.add('ficha_negra');
                event.target.appendChild(ficha);
                fichaJugada.push(parseInt(event.target.id));
                //fichas[event.target.id] = 2;
                 let posC=0;
                for(let i=0; i<8; i++){
                    for(let j=0; j<8; j++){
                        if(posC == event.target.id){
                            fichas[i][j] = 2;
                            juego[i][j].classList.remove('pista');
                            cambiar(turno, i, j, fichas, juego);
                        }

                        

                        posC++;
                    }
                }
            }*/




        //console.clear()

       turno = !turno; 
       vuelta++;

            for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(fichas[i][j] == 3 ){
                    fichas[i][j] = 0;
                    juego[i][j].classList.remove('pista');
                }
            }
        }
       let mov;

       intermedio();


   


        if(turno)
            turnoJugar[0].innerText = "Juegan: Blancas";
        else
            turnoJugar[0].innerText = "Juegan: Negras";


        for(let i=0; i<8; i++){
            for(let j=0; j<8; j++){
                if(fichas[i][j] ===1)
                    conBlancas++;
                else if(fichas[i][j] === 2)
                    conNegras++;
            }
        }


        puntajeBlancas[0].innerText = "Blancas(Jugador): "+conBlancas;
        puntajeNegras[0].innerText = "Negras(PC): "+conNegras;

       
        mov = HayMovimientos(turno, fichas);

        if(!mov){
            PaseTurnoB =false;
            turno = !turno;
            intermedio();
        }

        for(let i=0; i<8; i++){
                for(let j=0; j<8; j++){
                    if(fichas[i][j] ==3){
                        
                        juego[i][j].classList.add('pista');
                        
                    }
                }
        }


         /*let posxd=0;

            for(let i=0; i<8; i++){
                for(let j=0; j<8; j++){
                    if(fichas[i][j] === 3)
                        console.log(fichas[i][j] + " X: "+ j + " Y: "+i)
                }
            }*/

            
            let end = finJuego(fichas);

            if(end || conBlancas == 0 || conNegras == 0 || (PaseTurnoB == false && PaseTurnoN == false)){
                if(conBlancas > conNegras)
                    ganador[0].innerText = "Ganan: Blancas";
                else if(conBlancas < conNegras)
                    ganador[0].innerText = "Ganan: Negras";
                else if(conBlancas == conNegras)
                    ganador[0].innerText = "Empate";

                turnoJugar[0].innerText = "Juegan: -----";
            }

            clickPos=false;
            event.target.removeEventListener("click", movimiento)
        }
             
}

//////////////////

//Lógica IA
let fichasAux = new Array(8);
for (var i = 0; i < 8; i++) {
  fichasAux[i] = new Array(8);
}

function intermedio(){

    let i, k, puntajeInicial=0;
    let minimo=0, maximo=-99999;

    for(i =0; i<8; i++){
        for(k=0; k<8; k++){
            for(let m=0; m<8; m++){
                for(let n=0; n<8; n++){
                    fichasAux[m][n] = fichas[m][n];
                }
            }///
            if(jugable(turno, i, k, fichasAux)){
                    for(let m=0; m<8; m++){
                        for(let n=0; n<8; n++){
                            fichasAux[m][n] = fichas[m][n];
                        }
                    }///
                    cambiarAux(turno, i, k, fichasAux);
                

                for(let m =0; m<8; m++){
                    for(let n=0; n<8; n++){
                        if(fichasAux[m][n] == 2)
                            puntajeInicial++;
                    }
                }

                if(maximo < puntajeInicial){
                    xIA = i;
                    yIA = k;
                    maximo = puntajeInicial;
                }

            }//if jugable
            puntajeInicial = 0;
        }
    }

    console.log("X: "+xIA);
    console.log("Y: "+yIA);

    
if (fichas[xIA][yIA]===0 ||fichas[xIA][yIA]===3) {
      let  ficha = document.createElement("div");
        ficha.classList.add('ficha_negra');

    juego[xIA][yIA].appendChild(ficha);
    fichas[xIA][yIA] = 2;
    console.log(fichas[xIA][yIA])
    cambiar(turno, xIA, yIA, fichas, juego);
     PaseTurnoN = true;
    
}
turno = !turno;
}


///////////////////

////////////////////////////
function finJuego(fichas){

    let end = false;
    let cont= 0;
    for(let i =0; i<8; i++){
        for(let k=0; k<8; k++){
            if(fichas[i][k] != 0 && fichas[i][k] != 3 ){
                cont++;
            }   
        }
    }

    if(cont == 64)
        end=true;

    return end;   
}

///////////////////////////////
function HayMovimientos(turno, fichas){

    let mov = false;
    for(let i =0; i<8; i++){
        for(let k=0; k<8; k++){
            if(jugable(turno, i, k, fichas)){
                fichas[i][k] = 3;
                mov = true;
            }
        }
    }

    return mov;
    
}


function jugable(tuno, i, k, fichas){
    let y, x, contador=0;

    let jugador;

    if(turno)
        jugador = 1;
    else
        jugador = 2;

    if(fichas[i][k] === 0){

    for(y=i+1; y<8; y++){
        if(fichas[y][k] != 0 &&  fichas[y][k] != 3 && fichas[y][k] != jugador){
            contador++;
        }else{
            if(fichas[y][k]==jugador && contador >0 ){
                return true;
            }
            break;
        }
    }//////

    contador = 0; 

    for(y=i-1; y>=0; y--){
            if(fichas[y][k] != 0 &&   fichas[y][k] != 3 && fichas[y][k] != jugador){
                contador++;
            }else{
                if(fichas[y][k]==jugador && contador >0){
                    return true;
                }
                break;
            }
    }
    /////

    contador = 0; 

    for(x=k+1; x<8; x++){
            if(fichas[i][x] != 0 &&  fichas[i][x] != 3 && fichas[i][x] != jugador){
                contador++;
            }else{
                if(fichas[i][x]==jugador && contador >0 ){
                    return true;
                }
                break;
            }
    }

     contador = 0; 

    for(x=k-1; x>=0; x--){
            if(fichas[i][x] != 0  &&  fichas[i][x] != 3 && fichas[i][x] != jugador){
                contador++;
            }else{
                if(fichas[i][x]==jugador && contador >0){
                    return true;
                }
                break;
            }
    }

   contador = 0; 


   ///diagonales
   for(y=i+1, x=k+1; y<8 && x<8; y++, x++){
         if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x] != jugador){
                contador++;
            }else{
                if(fichas[y][x]==jugador && contador >0){
                    return true;
                }
                break;
            }
   }

   contador = 0; 


   ///diagonales
   for(y=i+1, x=k-1; y<8 && x>=0; y++, x--){
         if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x] != jugador){
                contador++;
            }else{
                if(fichas[y][x]==jugador && contador >0){
                    return true;
                }
                break;
            }
   }

      contador = 0; 


   ///diagonales
   for(y=i-1, x=k+1; y>=0 && x<8; y--, x++){
         if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x] != jugador){
                contador++;
            }else{
                if(fichas[y][x]==jugador && contador >0  ){
                    return true;
                }
                break;
            }
   }

         contador = 0; 


   ///diagonales
   for(y=i-1, x=k-1; y>=0 && x>=0; y--, x--){
         if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x] != jugador){
                contador++;
            }else{
                if(fichas[y][x]==jugador && contador >0){
                    return true;
                }
                break;
            }
   }
    }




    return false;
}


/////////////////////////////////////////////////////////7

function cambiar(turno, i, k, fichas, juego){

    let jugador;

    if(turno)
        jugador = 1;
    else
        jugador = 2;

    let contador=0,y,x;
    let band=false;
    //Revisar al rededor de la ficha
    //Cambio hacia abajo
    for( y=i+1;y<8;y++){
    if(fichas[y][k] != 0 && fichas[y][k] != 3 && fichas[y][k]!=jugador){
        contador++;
    }else {
       band=(fichas[y][k] ==jugador);
   
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
//     cout<<endl<<"Contador hacia abajo-> "<<contador<<endl;
    if(contador!=0 && band){
        for( y=i+1; contador>=0 ; contador--,y++ ){
//            cout<<endl<<"CAMBIO HACIA ABAJO REALIZADO"<<endl;
              fichas[y][k] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][k].firstElementChild.classList.remove('ficha_negra');
                juego[y][k].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][k].firstElementChild.classList.remove('ficha_blanca');
                juego[y][k].firstElementChild.classList.add('ficha_negra');
              }
        }
    }

    ///////////////////

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia arriba
    for( y=i-1;y>=0;y--){
    if(fichas[y][k] != 0 && fichas[y][k] != 3 && fichas[y][k]!=jugador){
        contador++;
    }else {
        band=(fichas[y][k] ==jugador);
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1; contador>=0 ; contador--,y-- ){
             fichas[y][k] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][k].firstElementChild.classList.remove('ficha_negra');
                juego[y][k].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][k].firstElementChild.classList.remove('ficha_blanca');
                juego[y][k].firstElementChild.classList.add('ficha_negra');
              }
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia arriba

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia derecha
    for( x=k+1;x<8;x++){
    if(fichas[i][x] != 0 && fichas[i][x] != 3 && fichas[i][x]!=jugador){
        contador++;
    }else {
        band=(fichas[i][x] ==jugador);
        break;
    }
    }//Verificacion y conteo de las fichas cambiar, de haber cambio

    if(contador!=0 && band){
        for( x=k+1; contador>=0 ; contador--,x++ ){
              fichas[i][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[i][x].firstElementChild.classList.remove('ficha_negra');
                juego[i][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[i][x].firstElementChild.classList.remove('ficha_blanca');
                juego[i][x].firstElementChild.classList.add('ficha_negra');
              }

        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia derecha

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia derecha
    for( x=k-1;x>=0;x--){
    if(fichas[i][x] != 0 && fichas[i][x] != 3 && fichas[i][x]!=jugador){
        contador++;
    }else {
        band=(fichas[i][x] ==jugador);
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio

    if(contador!=0 && band){
        for( x=k-1; contador>=0 ; contador--,x-- ){
             fichas[i][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[i][x].firstElementChild.classList.remove('ficha_negra');
                juego[i][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[i][x].firstElementChild.classList.remove('ficha_blanca');
                juego[i][x].firstElementChild.classList.add('ficha_negra');
              }

        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia izquierda

        //Diagonarles -------------------------

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera

    //Cambio diagonal inferior derecha
    for( y=i+1,x=k+1 ; y<8 && x<8; y++,x++){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( x=k+1,y=i+1; contador>=0 ; contador--, y++, x++ ){
            fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][x].firstElementChild.classList.remove('ficha_negra');
                juego[y][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][x].firstElementChild.classList.remove('ficha_blanca');
                juego[y][x].firstElementChild.classList.add('ficha_negra');
              }
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal inferior derecha

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal inferior izquierda
    for( y=i+1,x=k-1 ; y<8 && x>=0; y++,x--){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i+1,x=k-1 ; contador>=0 ; contador--, y++, x-- ){
              fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][x].firstElementChild.classList.remove('ficha_negra');
                juego[y][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][x].firstElementChild.classList.remove('ficha_blanca');
                juego[y][x].firstElementChild.classList.add('ficha_negra');
              }
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal inferior izquierda

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal superior derecha
    for( y=i-1,x=k+1 ; y>=0 && x<8; y--,x++){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1,x=k+1 ; contador>=0 ; contador--, y--, x++ ){
              fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][x].firstElementChild.classList.remove('ficha_negra');
                juego[y][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][x].firstElementChild.classList.remove('ficha_blanca');
                juego[y][x].firstElementChild.classList.add('ficha_negra');
              }
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal superior derecha

     contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal superior izquierda
    for( y=i-1,x=k-1 ; y>=0 && x>=0; y--,x--){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1,x=k-1 ; contador>=0 ; contador--, y--, x-- ){
             fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
              if(jugador == 1){
                juego[y][x].firstElementChild.classList.remove('ficha_negra');
                juego[y][x].firstElementChild.classList.add('ficha_blanca');
              }else{
                juego[y][x].firstElementChild.classList.remove('ficha_blanca');
                juego[y][x].firstElementChild.classList.add('ficha_negra');
              }
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal superior izquierda


}

/////////////////////////////////////////////

///Cambiar matriz auxiliar IA


function cambiarAux(turno, i, k, fichas){

    let jugador;

    if(turno)
        jugador = 1;
    else
        jugador = 2;

    let contador=0,y,x;
    let band=false;
    //Revisar al rededor de la ficha
    //Cambio hacia abajo
    for( y=i+1;y<8;y++){
    if(fichas[y][k] != 0 && fichas[y][k] != 3 && fichas[y][k]!=jugador){
        contador++;
    }else {
       band=(fichas[y][k] ==jugador);
   
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
//     cout<<endl<<"Contador hacia abajo-> "<<contador<<endl;
    if(contador!=0 && band){
        for( y=i+1; contador>=0 ; contador--,y++ ){
//            cout<<endl<<"CAMBIO HACIA ABAJO REALIZADO"<<endl;
              fichas[y][k] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
    
        }
    }

    ///////////////////

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia arriba
    for( y=i-1;y>=0;y--){
    if(fichas[y][k] != 0 && fichas[y][k] != 3 && fichas[y][k]!=jugador){
        contador++;
    }else {
        band=(fichas[y][k] ==jugador);
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1; contador>=0 ; contador--,y-- ){
             fichas[y][k] = jugador;
      
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia arriba

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia derecha
    for( x=k+1;x<8;x++){
    if(fichas[i][x] != 0 && fichas[i][x] != 3 && fichas[i][x]!=jugador){
        contador++;
    }else {
        band=(fichas[i][x] ==jugador);
        break;
    }
    }//Verificacion y conteo de las fichas cambiar, de haber cambio

    if(contador!=0 && band){
        for( x=k+1; contador>=0 ; contador--,x++ ){
              fichas[i][x] = jugador;
         
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia derecha

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio hacia derecha
    for( x=k-1;x>=0;x--){
    if(fichas[i][x] != 0 && fichas[i][x] != 3 && fichas[i][x]!=jugador){
        contador++;
    }else {
        band=(fichas[i][x] ==jugador);
        break;
    }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio

    if(contador!=0 && band){
        for( x=k-1; contador>=0 ; contador--,x-- ){
             fichas[i][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
            

        }
    }//Cambio de las fichas necesarias
    // Fin Cambio hacia izquierda

        //Diagonarles -------------------------

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera

    //Cambio diagonal inferior derecha
    for( y=i+1,x=k+1 ; y<8 && x<8; y++,x++){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( x=k+1,y=i+1; contador>=0 ; contador--, y++, x++ ){
            fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
    
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal inferior derecha

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal inferior izquierda
    for( y=i+1,x=k-1 ; y<8 && x>=0; y++,x--){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i+1,x=k-1 ; contador>=0 ; contador--, y++, x-- ){
              fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal inferior izquierda

    contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal superior derecha
    for( y=i-1,x=k+1 ; y>=0 && x<8; y--,x++){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1,x=k+1 ; contador>=0 ; contador--, y--, x++ ){
              fichas[y][x] = jugador;
              //console.log(juego[y][k].firstElementChild.classList.value)
      
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal superior derecha

     contador=0;//Reinicializacion del contador
    band=false;//Reinicializacion de la bandera
    //Cambio diagonal superior izquierda
    for( y=i-1,x=k-1 ; y>=0 && x>=0; y--,x--){
        if(fichas[y][x] != 0 && fichas[y][x] != 3 && fichas[y][x]!=jugador){
            contador++;
        }else {
            band=(fichas[y][x] ==jugador);
            break;
        }

    }//Verificacion y conteo de las fichas cambiar, de haber cambio
    if(contador!=0 && band){
        for( y=i-1,x=k-1 ; contador>=0 ; contador--, y--, x-- ){
             fichas[y][x] = jugador;
  
        }
    }//Cambio de las fichas necesarias
    // Fin Cambio diagonal superior izquierda


}