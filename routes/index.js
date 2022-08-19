const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:url', function (req, res, next) {
	var URL = params.url;
	// First created a JSON variable to store data
	axios.get(URL).then(res=>{res.text()}).then(responseText=>{
		const doc = new DOMParser().parseFromString(responseText, 'text/html');
		var data = {};
		[...doc.forms[0].querySelectorAll('input')].forEach(input =>{
			// Extract the names of inputs in the forms of the website, can use ID instead of name
			console.log(input.name);
			// Ask for the value that should be inputed on the field
			// var `Q:${input.name}` = prompt(`Enter your value for ${input.name}`);
			// Store values in a json
			data[input.name] = prompt(`Enter your value for ${input.name}`);
		});
		// Write JSON into a file
		fs.writeFile('data.json', JSON.stringify(data), err=>{
			if (err) throw err;
			console.log("Successfully written data");
		});
		// Extract json data and autofill website entries
		fs.readFile('data.json', function(err, data){
			if (err) throw err;
			var data = JSON.parse(data);
			// Autofill website forms
			for (name in data){
				doc.getElementByName(name).value = data[name];
			}
			console.log("Finished.")
		});

	}) 
});

module.exports = router;