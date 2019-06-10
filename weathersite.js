//create objecta based on formal/casual -> color scheme
//already worn button?
//randomize
 

///////clothing item pictures
/*
const clothesPictures = new Array();
clothesPictures[0] = new Image(200,200);
clothesPictures[0].src = "C:\Users\ard91\Documents\GitHub\weatherclothes\jeans.jpg";
*/
const picShirts = ["\\aegrey2.jpg","\\aeshirt2.jpg","\\hollister.jpg","\\images.jpg"];
const picBottoms = ["\\bchino.png","\\kchino.jpg","\\jeans.jpg","\\khakis.jpg"];
const picturePath = "C:\\Users\\ard91\\Documents\\GitHub\\weatherclothes";
let botPath;
let topPath;



//clothes objects created here
let Clothes = function(where,color,longness){
    this.where = where;
    this.color = color;
    this.longness = longness;   
}

///////////////clothing items objects
const hollister = new Clothes('top','reds','long');
const aegrey2 = new Clothes('top','blues','tshirt');
const aeshirt2 = new Clothes('top','reds','tshirt');
const images = new Clothes('top','blues','long');
var shirts = [aegrey2,aeshirt2,hollister,images];

const jeans = new Clothes('bottom','blues','pants');
const khakis = new Clothes('bottom','reds','pants');
const kchino = new Clothes('bottom','reds','shorts');
const bchino = new Clothes('bottom','blues','shorts');
var bottoms = [bchino,kchino,jeans,khakis];


//put pictures array as last spot in objects array

let colorz;
const randColor =()=> {
    return Math.round(Math.random())};
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
   
    if ( randColor() == 1){
        console.log("9999999999999999999")
        document.getElementById("shoes").src = picturePath+ "\\grayvans.jpg";
    }
    else{
        console.log(7777777777777777);
        document.getElementById("shoes").src = picturePath+ "\\nmds.jpg";
    }
    var thisCity;
    if(document.getElementById("SanAntonio").checked == true){thisCity= "San Antonio, US"}
    else if(document.getElementById("Milan").checked == true){thisCity = "Tokyo, JP"}
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
                    console.log(arrayz[i]);
                    console.log("success");
                    if (model.where == 'top'){
                        topPath = (picturePath + picShirts[i]);
                        console.log(topPath);
                        document.getElementById("displayTop").src = topPath; 
                    }
                    else{botPath = (picturePath + picBottoms[i]);
                        console.log(botPath);
                        document.getElementById("displayBottom").src = botPath;
                    }
                    
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
        document.getElementById("coat").src = picturePath+ "\\rain.jpg";
    } 
    else{rainCoat=false;
        document.getElementById("coat").src = null;
    };
    console.log("Rain Coat: " + rainCoat);
    //const throwError = ()
    
    return rainCoat;
    
}

