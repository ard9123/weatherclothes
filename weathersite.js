//clothing item pictures
const picShirts = ["\\aegrey2.jpg", "\\aeshirt2.jpg", "\\hollister.jpg", "\\images.jpg"];
const picBottoms = ["\\bchino.png", "\\kchino.jpg", "\\jeans.jpg", "\\khakis.jpg"];
const picturePath = "C:\\Users\\ard91\\Documents\\GitHub\\weatherclothes\\clothes";
let botPath;
let topPath;

//declares variable later to be assigned with boolean value depending on temperature
let veryCold;

//clothes objects created here
let Clothes = function (where, color, longness) {
    this.where = where;
    this.color = color;
    this.longness = longness;
}

//top objects
const hollister = new Clothes('top', 'reds', 'long');
const aegrey2 = new Clothes('top', 'blues', 'tshirt');
const aeshirt2 = new Clothes('top', 'reds', 'tshirt');
const images = new Clothes('top', 'blues', 'long');
var shirts = [aegrey2, aeshirt2, hollister, images];

//bottom objects
const jeans = new Clothes('bottom', 'blues', 'pants');
const khakis = new Clothes('bottom', 'reds', 'pants');
const kchino = new Clothes('bottom', 'reds', 'shorts');
const bchino = new Clothes('bottom', 'blues', 'shorts');
var bottoms = [bchino, kchino, jeans, khakis];

//color scheme randomly chosen as either red or blue
let colorz;
const randColor = () => {
    return Math.round(Math.random())
};
if (randColor == 1) {
    colorz = 'reds';
}
else {
    colorz = 'blues'
}

//determines if shirts and shorts match conditions
const isEligible = function (Model) {
    //checks if "where" and "color" of clothing object match that of model
    if (this.where == Model.where && this.color == Model.color && this.longness == Model.longness) {
        return true
    }
    else { return false }
}

//function called when button pressed
function startUp() {

    //assigns shoes based on assigned color
    if (colorz == "reds") {
        document.getElementById("shoes").src = picturePath + "\\grayvans.jpg";
    }
    else {
        document.getElementById("shoes").src = picturePath + "\\nmds.jpg";
    }

    //checks which city is selected on document button
    var thisCity;
    if (document.getElementById("SanAntonio").checked == true) { thisCity = "San Antonio, US" }
    else if (document.getElementById("Milan").checked == true) { thisCity = "Tokyo, JP" }
    else if (document.getElementById("MXcity").checked == true) { thisCity = "Mexico City, MX" }
    else if (document.getElementById("Reykjavik").checked == true) { thisCity = "Reykjavik, IS" }

    //get temperature data 
    function weatherGatherer(cityID) {

        //api key
        const key = 'a2b9ebb3b6b76c74ba5c2b5bca852517';

        //fetches data from api using city ID
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityID + '&appid=' + key)
            .then(response => {

                //recieves weather data from city in form of JSON file
                return response.json()
            })

            .then(data => {
                // returns an array with avg temp, rain, humid, wind
                return [Math.floor((data.main.temp - 273) * (9 / 5) + 32), data.weather[0].main, data.main.humidity, data.wind.speed];
            })

            //array is called extrem
            .then(extrem => {

                //displays weather condutions from an array on document
                document.getElementById("temp").innerHTML = extrem[0];
                document.getElementById("main").innerHTML = extrem[1];
                document.getElementById("humid").innerHTML = extrem[2];
                document.getElementById("wspeed").innerHTML = extrem[3];

                //calls functions that determine what to wear based on conditions
                //returns array with what to wear
                return [shortsOrPants(extrem[0], extrem[3]), longOrT(extrem[0], extrem[2]), rainCoat(extrem[1]), veryCold];
            })

            //wearArr contains data of what to wear
            .then(wearArr => {

                //model is clothing object of a possible outfit based on conditions
                let model = new Clothes('top', colorz, wearArr[1]);

                //finds article of clothing that will match
                //function called on array of clothing objects
                var findArticle = function (arrayz) {

                    //keeps track of amount of times an eligible object is not found
                    var failCounts = 0;

                    //loops through all clothing articles until matching object found
                    for (var i = 0; i < arrayz.length; i++) {

                        //checks to see if object matches model
                        var compareRes = isEligible.call(arrayz[i], model);

                        //if object is a match, assigns path of that object
                        if (compareRes == true) {

                            //path varies depending on top or bottom
                            if (model.where == 'top') {
                                topPath = (picturePath + picShirts[i]);
                                document.getElementById("displayTop").src = topPath;
                            }
                            else {
                                botPath = (picturePath + picBottoms[i]);
                                console.log(botPath);
                                document.getElementById("displayBottom").src = botPath;
                            }

                            return
                        }

                        //increments by objects that dont match
                        else { failCounts += 1 }
                    }

                    //switches color scheme if no objects found
                    if (failCounts == 3) {
                        if (model.color == "reds") {
                            model.color = "blues";
                        }
                        else { model.color = "reds"; }
                    }


                    findArticle(shirts);
                }
                //function called for top
                findArticle(shirts);

                //repeats for bottom article
                model.where = 'bottom';
                model.longness = wearArr[0];
                findArticle(bottoms);

            })

            .catch(errors => {
                console.log(errors)
            });
    }
    weatherGatherer(thisCity)
}

//shorts/pants will be affected by wind and temperature
shortsOrPants = (temperature, windspeed) => {

    //creates variables for bottom objects
    veryCold = false;
    let shorts;
    let newTemp;

    if (temperature < 70) {
        newTemp = (35.74 + (.6215 * temperature) - (35.75 * Math.pow(windspeed, .16)) + (.4275 * temperature * Math.pow(windspeed, .16)))
        if (newTemp < 60) {

            if (newTemp < 40) {
                veryCold = true;
            }
            return "pants";
        }
        else {
            return "shorts";
        }
    }
    else {
        return "shorts";
    }
}

//long or t shirt will be affacted by humidity and temperature
longOrT = (temperature, humid) => {

    //variables made for top objects
    let tShirt;
    let newTemp;

    if (temperature < 40) {
        return "long";
        veryCold = true;
    }
    else {
        if (humid > 67) {
            newTemp = temperature + (.5 * (humid - 67));
        }
        else {
            newTemp = temperature;
        }
        if (newTemp > 65) {
            return "tshirt";
        }
        else {
            console.log(newTemp);
            return "long";
        }
    }
}

//precipitation determines raincoat
rainCoat = (overallWeather) => {

    let rainCoat;

    //displays raincoat if necessary
    if (overallWeather == "Rain" || overallWeather == "Thunderstorm") {
        rainCoat = true;
        document.getElementById("coat").src = picturePath + "\\rain.jpg";
    }
    else {
        rainCoat = false;
        document.getElementById("coat").src = null;
    };
    console.log("Rain Coat: " + rainCoat);

    return rainCoat;

}

