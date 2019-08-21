const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

console.log("Weather app starting!");

const argv = yargs
	.options({
		'address': {
			demand: true,
			alias: 'a',
			describe: 'Address to fetch weather for',
			string: true
		},
		'uvIndex': {
			alias: 'u',
			describe: 'Set if you want the UV Index',
			boolean: true
		},
		'precipProb': {
			alias: 'p',
			describe: 'Set if you want the probability of precipitation',
			boolean: true
		}
})
.help()
.alias('help', 'h')
.argv;


geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	} else {
		console.log(results.address);
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
			if(errorMessage){
				console.log(errorMessage);
			} else {
				console.log(`It's currently ${weatherResults.temperature}.  It feels like ${weatherResults.apparentTemperature}.`);
				if(argv.uvIndex){
					console.log(`The UV index is currently ${weatherResults.uvIndex}`);
					if(weatherResults.uvIndex > 7){ console.log("Wear sunscreen!");}
				}
				if(argv.precipProb){
					console.log(`The probability of ${weatherResults.precipType} is ${weatherResults.precipProbability}`);
					if(weatherResults.precipProbability > 0.5){console.log("Dress appropriately!");}
				}
			}
		});
	}
});