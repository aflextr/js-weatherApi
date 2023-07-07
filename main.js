var form = document.getElementsByName("form")[0];
var yer = document.forms["form"]["yer"];
var localYer = document.forms["form"]["localyer"];

var api = "https://geocoding-api.open-meteo.com/v1/";

var sonuclar = document.getElementById("sonuclar");
var havadurumu = document.getElementById("havadurumu");

var latitude =0;
var longitude = 0;


localYer.addEventListener("click",()=>{
    navigator.geolocation.getCurrentPosition((basarili)=>{
        latitude = basarili.coords.latitude;
        longitude = basarili.coords.longitude;
        
    },(basarisiz)=>{
        console.log("Lütfen konum ayarını kabul edin " + basarisiz);
    })
})

yer.addEventListener("keyup", (ev)=>{
    ev.preventDefault();
    setTimeout(async ()=>{await LokasyonArat(yer.value)},1000)
    
})

form.addEventListener("submit",async (ev)=>{
    ev.preventDefault();

    await LokasyonArat(yer.value);

})


async function LokasyonArat(veri){
    sonuclar.innerHTML = "";
    await fetch(`${api+`search?name=${veri}&count=5&language=en&format=json`}`).then((value=>value.json())).then((value)=>{
        value.results.forEach(element => {
           
            sonuclar.innerHTML += `<li class="p-4 border-2 border-black rounded-2xl bg-gray-700 w-screen md:w-full ">
            <a href="#" onclick="HavaDurumuGetir(${element.latitude},${element.longitude},'${element.country}/${element.admin1}/${element.name}')"  class="mr-4 hover:underline md:mr-6 md:font-large md:text-2xl "> ${element.country}/${element.admin1}/${element.name}</a>
        </li>`
        });

        
        
    })
}

async function HavaDurumuGetir(latitudes,longitudes,name){
    havadurumu.innerHTML = "";
    latitude = latitudes;
    longitude = longitudes;
    await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`).then(value=>value.json()).then((value)=>{
       
        havadurumu.innerHTML = ` <div
        class="text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <a href="#">
            <img class="rounded-t-lg mx-auto m-4" width="512" src="/GettyImages-1383026300-c9979ab93b1b4571a3ef3b36ccf50bb4.jpg" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">${name}</h5>
            </a>
            <p class="mb-3 font-normal text-white ">${value.hourly.temperature_2m[0]} Derece</p>
        </div>
        <p class="mb-3 font-normal text-white ">Tarih : ${value.hourly.time[0]}</p>
    </div>`
    });
}


{/*  */}