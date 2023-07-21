var searchB=document.querySelector('.search-bar span');
var inputField=document.querySelector('.search-bar input');
var Ip=document.querySelector('.key-information .ip');
var Loc=document.querySelector('.key-information .location');
var Timezone=document.querySelector('.key-information .timezone');
var Isp=document.querySelector('.key-information .isp');

let ipAddress='192.212.174.101'
let lat;
let lng;

var map = L.map('map')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var MyIcon = L.icon({
    iconUrl: 'images/icon-location.svg',    
    iconAnchor:   [25, 16]    
});

var marker=L.marker([0, 0], {icon: MyIcon}).addTo(map);

function getCoordinates(){
     fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_GgRamEzsEjkTVcsHc5vbVrGFIS8Ce&ipAddress=${ipAddress}`)
    .then(repo=>{
        return repo.json();
    })
    .then(res=>{
        lat=res.location.lat;
        lng=res.location.lng;

        loadMap(lat, lng);

        Ip.textContent=res.ip;  
        Loc.textContent=`${res.location.city}, ${res.location.region}`;
        Timezone.textContent=`UTC${res.location.timezone}`;
        Isp.textContent=res.isp;
    })
}

getCoordinates();

function loadMap(lat, lng){
    map.setView([lat, lng], 17)
    marker.setLatLng([lat, lng]);
}


searchB.onclick=()=>{
    if(inputField!==''){
        ipAddress=inputField.value;
        inputField.value='';
        getCoordinates();
    }
}