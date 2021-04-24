let date=new Date();("longitud");

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

  
// ---------------------------------------------

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

//--------------------------------------------------

function create_temp(latitude,longitude){


    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=87e4f01705095dec0164761d3cb63252&units=metric&lang=es`).then(response => response.json())
         .then(data => {
          document.querySelector("#map_marker").textContent=data.name;

          document.querySelector(".date").textContent=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" |  "+date.getHours()+":"+date.getMinutes();

          document.querySelector(".data_clima_item2").textContent=Math.round(data.main.temp)+"° C";
          document.getElementById("temp_max").innerHTML=Math.round(data.main.temp_max)+"Max";
          document.getElementById("temp_min").innerHTML=Math.round(data.main.temp_min)+"Min";

          document.querySelector(".data_clima_item4").textContent=data.main.humidity+" Humedad";
      

          document.querySelector(".data_clima_item5").textContent=data.main.pressure+" presión";



document.querySelector(".data_clima_item6").textContent=data.main.grnd_level+"ground level";

document.querySelector(".data_clima_item7").textContent=data.wind.gust+"gust";

document.querySelector(".data_clima_item8").textContent=data.wind.speed+"speed"

             pronostico_5_days(data.name);
        }).catch(error => console.log(error)); 

 }


 function pronostico_5_days(params) {
     console.log(params);
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${params}&appid=87e4f01705095dec0164761d3cb63252&units=metric&lang=es`).then(response => response.json())
     .then(data => {
     
  }).catch(error => console.log(error)); 
 }

 /********************************/
 let btn3=document.querySelector('.item_slider3');
 let btn2=document.querySelector('.item_slider2');
let btn1=document.querySelector('.item_slider1');
btn1.addEventListener('click',function () {
  document.querySelector('.data_clima_contaniner').classList.toggle('transition1');
  document.querySelector('.data_clima_contaniner').classList.remove('transition2');
  document.querySelector('.data_clima_contaniner').classList.remove('transition3');
  btn1.classList.toggle('owl');
  btn2.classList.remove('owl');
  btn3.classList.remove('owl');
  console.log("primero");
});


btn2.addEventListener('click',function () {
  document.querySelector('.data_clima_contaniner').classList.toggle('transition2');
  document.querySelector('.data_clima_contaniner').classList.remove('transition1');
  document.querySelector('.data_clima_contaniner').classList.remove('transition3');
  btn1.classList.remove('owl');
  btn2.classList.toggle('owl');
  btn3.classList.remove('owl');
});


btn3.addEventListener('click',function () {
  document.querySelector('.data_clima_contaniner').classList.toggle('transition3');
  document.querySelector('.data_clima_contaniner').classList.remove('transition2');
  document.querySelector('.data_clima_contaniner').classList.remove('transition1');
  btn1.classList.remove('owl');
  btn2.classList.remove('owl');
  btn3.classList.toggle('owl');
});

















/*
Llame a los datos meteorológicos actuales para una ubicación
=>https://api.openweathermap.org/data/2.5/weather?lat=${$latitud.innerHTML}&lon=${$longitud.innerText}&appid=87e4f01705095dec0164761d3cb63252

Pronóstico del tiempo de 5 días
=>api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


https://www.google.com/maps/place/4%C2%B055'16.9%22S+80%C2%B039'57.5%22W/@-4.9213496,-80.6681674,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d-4.9213549!4d-80.6659734
*/