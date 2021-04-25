/*

Página desarrollada  por Jhonathan O'brian Saavedra web's, subida y alojada en github para que los desarrolladores puedan ver el codigo y usarlo para test. 
En Inter Tech ayudamos los jóvenes que van empezando. Siguenos en Facebook: https://www.facebook.com/InteraccionTecnologica y 
github como:https://github.com/intertech20/ 

*/

/* ==============================================
                    VARIABLES
 ==============================================*/
let date=new Date();

let btn3=document.querySelector('.item_slider3');
let btn2=document.querySelector('.item_slider2');
let btn1=document.querySelector('.item_slider1');

/* ==============================================
             COODENADAS DEL NAVEGADOR
 ==============================================*/
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    create_map(pos.coords.latitude,pos.coords.longitude);
    create_temp(pos.coords.latitude,pos.coords.longitude);
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);

/* ==============================================
              CAPTURANDO LAS COORDENADAS
              SE CREA EL MAPS SE CONSUME
                 LA API LEAFLETJS
 ==============================================*/
  function create_map(latitude,longitude) {
    let mymap = L.map('map').setView([latitude,longitude], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
    }).addTo(mymap);
    L.marker([latitude, longitude]).addTo(mymap);
}

/* ==============================================
              CAPTURANDO LAS COORDENADAS
              SE CREA EL MAPS SE CONSUME
                LA API OPENWEATHERMAP
 ==============================================*/
 
 
function create_temp(latitude,longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=87e4f01705095dec0164761d3cb63252&units=metric&lang=es`).then(response => response.json())
         .then(data => {
  
        create_temp_function("#map_marker",data.name);

        create_temp_function(".date",date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" |  "+date.getHours()+":"+date.getMinutes());
         
        create_temp_function(".data_clima_item1",
          `<span class="img_description text_clima_item_left">${data.weather[0]["description"]}</span>
          <img class="temp-icon text_clima_item_right" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0]["icon"]}.svg" 
          title="${data.weather[0]["description"]}"
          alt="${data.weather[0]["description"]}">
           `);
          // ---------------------data_clima_contaniner_item1------------------------
        create_temp_function(".data_clima_item2",`<p class="text_clima_item_left">Temperatura</p><p class="text_clima_item_right">${Math.round(data.main.temp)} ° C</p>`);
   

        create_temp_function(".data_clima_item3",`<p class="text_clima_item_left">Temperatura Máxima</p><p class="text_clima_item_right">${Math.round(data.main.temp_max)} ° C</p>`);
   
        create_temp_function(".data_clima_item4",`<p class="text_clima_item_left">Temperatura Minima</p><p class="text_clima_item_right">${Math.round(data.main.temp_min)} ° C</p>`);

        create_temp_function(".data_clima_item5",`<p class="text_clima_item_left">Humedad</p><p class="text_clima_item_right">${data.main.humidity}</p>`);

        create_temp_function(".data_clima_item6",`<p class="text_clima_item_left">Presión</p><p class="text_clima_item_right">${data.main.pressure}</p>`);

        create_temp_function(".data_clima_item7",`<p class="text_clima_item_left">Nivel del suelo</p><p class="text_clima_item_right">${data.main.grnd_level}</p>`);
      
        create_temp_function(".data_clima_item8",`<p class="text_clima_item_left">Ráfaga</p><p class="text_clima_item_right">${data.wind.gust}</p>`);

        create_temp_function(".data_clima_item9",`<p class="text_clima_item_left">Velocidad</p><p class="text_clima_item_right">${data.wind.speed}</p>`);

             pronostico_5_days(data.name);
        }).catch(error => console.log(error)); 

 }

 function create_temp_function(etiqueta,string_) {
    document.querySelector(etiqueta).innerHTML=string_;
 }

/* ==============================================
    CAPTURANDO LAS COORDENADAS SE CREA EL MAPS 
        SE CONSUME LA API OPENWEATHERMAP PARA 
              CAPTURAR EL PRONONOSTICO
                DEL CLIMA EN 5 DIAS
 ==============================================*/
 function pronostico_5_days(params) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params}&appid=87e4f01705095dec0164761d3cb63252&units=metric&lang=es`).then(response => response.json())
     .then(data => {
     date_pronostico(data);
  }).catch(error => console.log(error)); 
 }

/* ==============================================
            SE ENVIAN LOS VALORES CAPTURADOS
            DEL PRONOSTICO A SU RESPECTIVAS 
                      ETIQUETAS
 ==============================================*/
 
 function date_pronostico(data) {
      //---------------------------------------- 
      date_pronostico_function (1,(data.list[2].dt_txt).slice(0, 10),
      Math.round(data.list[2].main.temp_max),
      Math.round(data.list[2].main.temp_min));
      //----------------------------------------
      date_pronostico_function (2,(data.list[9].dt_txt).slice(0, 10),
      Math.round(data.list[9].main.temp_max),
      Math.round(data.list[9].main.temp_min));
     //----------------------------------------
      date_pronostico_function (3,(data.list[19].dt_txt).slice(0, 10),
      Math.round(data.list[19].main.temp_max),
      Math.round(data.list[19].main.temp_min));
      //----------------------------------------
      date_pronostico_function (4,(data.list[24].dt_txt).slice(0, 10),
      Math.round(data.list[24].main.temp_max),
      Math.round(data.list[24].main.temp_min));
      //----------------------------------------
      date_pronostico_function (5,(data.list[31].dt_txt).slice(0, 10),
      Math.round(data.list[31].main.temp_max),
      Math.round(data.list[31].main.temp_min));
      //---------------------------------------- 
      hour_pronostico(data);
 }

 function date_pronostico_function (number,data_1,data_2,data_3){
  document.querySelector(".date_pronostico_"+number).innerHTML=`
   <p class="text_clima_item_left">${data_1}</p>
   <p class="text_clima_item_right">
   <i class="fas fa-long-arrow-alt-up"></i>
   ${data_2} ° C</p>
   <p class="text_clima_item_right">
   <i class="fas fa-long-arrow-alt-down"></i>
   ${data_3} ° C</p>`
 }

 /* ==============================================
            SE ENVIAN LOS VALORES CAPTURADOS
            DEL PRONOSTICO A SU RESPECTIVAS 
                      ETIQUETAS
 ==============================================*/
 
 function hour_pronostico(data) {
   hour_pronostico_function (1,(data.list[2].dt_txt).slice(11, 16),
   Math.round(data.list[2].main.temp));
    //----------------------------------------
    hour_pronostico_function (2,(data.list[9].dt_txt).slice(11, 16),
    Math.round(data.list[9].main.temp));
     //----------------------------------------
    hour_pronostico_function (3,(data.list[19].dt_txt).slice(11, 16),
    Math.round(data.list[19].main.temp));
    //----------------------------------------
    hour_pronostico_function (4,(data.list[24].dt_txt).slice(11, 16),
    Math.round(data.list[24].main.temp));
    //----------------------------------------
    hour_pronostico_function (5,(data.list[31].dt_txt).slice(11, 16),
    Math.round(data.list[31].main.temp));
     //---------------------------------------- 
    //  let dat = new Date(2021,3,25);
    //  console.log((dat.toString()).slice(0, 11));
 }

 function hour_pronostico_function (number,data_1,data_2){
    document.querySelector(".hour_pronostico_"+number).innerHTML=`
    <p class="text_clima_item_left">${data_1}</p>
    <p class="text_clima_item_right">${data_2} ° C</p>`;
 }

/* ==============================================
              BOTONES DEL SLIDER
 ==============================================*/
btn1.addEventListener('click',function () {
    data_clima_contaniner_fuction('transition2','transition1','transition3');
    button(btn1,btn2,btn3);

});

btn2.addEventListener('click',function () {
    data_clima_contaniner_fuction('transition2','transition1','transition3');
    button(btn2,btn1,btn3);
});

btn3.addEventListener('click',function () {
    data_clima_contaniner_fuction('transition3','transition2','transition2');
    button(btn3,btn1,btn2);
});

function data_clima_contaniner_fuction(transition1,transition2,transition3) {
    document.querySelector('.data_clima_contaniner').classList.toggle(transition1);
    document.querySelector('.data_clima_contaniner').classList.remove(transition2);
    document.querySelector('.data_clima_contaniner').classList.remove(transition3);
}

function button(tog,rem_1,rem_2) {
    tog.classList.toggle('owl');
    rem_1.classList.remove('owl');
    rem_2.classList.remove('owl');
}
