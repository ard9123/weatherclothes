//create objecta based on formal/casual -> color scheme
//already worn button?
//randomize
 

///////clothing item pictures





//clothes objects created here
let Clothes = function(where,color,longness){
    this.where = where;
    this.color = color;
    this.longness = longness;   
}

///////////////clothing items objects
const pinkHol = new Clothes('top','reds','long');
const hamilton = new Clothes('top','blues','tshirt');
const bayern = new Clothes('top','reds','tshirt');
const ncaa = new Clothes('top','blues','long');
var shirts = [pinkHol,hamilton,bayern,ncaa];

const chinos = new Clothes('bottom','blues','pants');
const khakis = new Clothes('bottom','reds','pants');
const ksho = new Clothes('bottom','reds','shorts');
const boats = new Clothes('bottom','blues','shorts');
var bottoms = [chinos,khakis,boats,ksho];

//put pictures array as last spot in objects array

let colorz;
const randColor = Math.round(Math.random());
if (randColor == 1){
     colorz = 'reds';
}
else{
     colorz = 'blues'
}
let veryCold;

//determines if shirts and shorts match conditions
const isEligible = function(Model){
    if(this.where==Model.where && this.color==Model.color && this.longness==Model.longness){
        return true}
    else{return false}
    }

function startUp(){
    var thisCity;
    if(document.getElementById("SanAntonio").checked == true){thisCity= "San Antonio, US"}
    else if(document.getElementById("Milan").checked == true){thisCity = "Lagos, NG"}
    else if(document.getElementById("MXcity").checked == true){thisCity= "Mexico City, MX"}
    else if(document.getElementById("Reykjavik").checked == true){thisCity = "Reykjavik, IS"}
    
////////////////get temperature data 
function weatherGatherer( cityID ) {
  const key = 'a2b9ebb3b6b76c74ba5c2b5bca852517';
    
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID+ '&appid=' + key)  
  .then(response=>{
        return response.json() }) 
        
  .then(data=>{
        console.log(data);
        // avg temp, rain?, humid, wind
        return [Math.floor((data.main.temp-273) * (9/5) + 32),data.weather[0].main,data.main.humidity,data.wind.speed];
  })
    //determine what to wear
   .then(extrem=>{
        //shorts?, t shirt?, rain coat?, winter coat?
      document.getElementById("temp").innerHTML = extrem[0];
      document.getElementById("main").innerHTML = extrem[1];                                                    
      document.getElementById("humid").innerHTML = extrem[2];
      document.getElementById("wspeed").innerHTML = extrem[3];  
      return [shortsOrPants(extrem[0],extrem[3]),longOrT(extrem[0],extrem[2]),rainCoat(extrem[1]),veryCold];  
  })
    .then(toDo=>{
        console.log(toDo)
        let model = new Clothes('top',colorz,toDo[1]);
            
        var cannotFail = function(arrayz){
            var failCounts = 0;
            for(var i = 0; i <arrayz.length;i++){
                var compareRes = isEligible.call(arrayz[i],model);
                
                if(compareRes==true){
                    console.log("sucess")
                    return
                }
                else{failCounts+=1}
            }
                if(failCounts == 3){
                    if(model.color=="reds"){
                        model.color= "blues";
                    }
                    else{model.color="reds";}  
                }
                cannotFail(shirts);
        }
        cannotFail(shirts);
      
        model.where = 'bottom';
        model.longness = toDo[0];
        cannotFail(bottoms);
        
  })
       
  .catch(errors=>{
        console.log(errors)
  });
}
  weatherGatherer(thisCity)  
}



////////////////////////////////////////// decide what to wear 

//shorts/pants will be affected by wind and temperature
shortsOrPants = (temperature,windspeed)=>{
    veryCold=false;
    let shorts;
    let newTemp;
    if(temperature<70){
        newTemp = (35.74 + (.6215*temperature)-(35.75*Math.pow(windspeed,.16)) + (.4275*temperature*Math.pow(windspeed,.16)))
        if (newTemp<60){
            
            if (newTemp<40){
                veryCold = true;
            }
            return "pants";
        }
        else{
            return "shorts";       
        }
    }
    else{
        return "shorts";
    }
console.log("winter coat:? " + veryCold)
}
//long or t shirt will be affacted by humidity and temperature
longOrT = (temperature, humid)=>{
    console.log(temperature);
    let tShirt;
    let newTemp;
    if(temperature<40){
        return "long";
        veryCold = true;
    }
    else{
        if(humid>67){
            newTemp= temperature + (.5*(humid-67));
        }
        else {
            newTemp = temperature;
        }
        if (newTemp>65){
                return "tshirt";
            }
        else{ console.log(newTemp);
            return "long";       
            }
    }
}
//rain coat?
rainCoat = (overallWeather)=>{
    console.log(overallWeather);
    let rainCoat;
    if(overallWeather == "Rain"|| overallWeather =="Thunderstorm"){
        rainCoat= true;
    } 
    else{rainCoat=false};
    console.log("Rain Coat: " + rainCoat);
    return rainCoat;
    
}

/*

async function getWeather(yourLocation){
    try {
        const key = 'a2b9ebb3b6b76c74ba5c2b5bca852517';
        const result = await  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + yourLocation+ '&appid=' + key);
        const data = await result.json();
        return data
         
     }  catch(error){
            console.log(error);
     }
    
}
let dataSA= [];
let useableData = getWeather("San Antonio,US").then(data=> {
    dataSA= [Math.floor((data.main.temp-273) * (9/5) + 32),data.weather[0].main,data.main.humidity,data.wind.speed];
    console.log(dataSA);
    return dataSA;
});
*/
