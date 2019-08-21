const request = require('request');

var getWeather = (lat, lng, callback) => {
	request({
		url: `https://api.darksky.net/forecast/846bc25b2cc78f43cda864c2b68640b0/${lat},${lng}`,
		json: true
	}, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature,
				uvIndex: body.currently.uvIndex,
				precipType: body.currently.precipType,
				precipProbability: body.currently.precipProbability
			});
		} else {
			callback('Unable to fetch weather');
		}
	});
};

module.exports = {
	getWeather
};

