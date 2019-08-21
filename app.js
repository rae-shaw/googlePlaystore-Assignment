const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const playApps = require('./playstore.js');


app.get('/apps', (req, res) => {
	const { search = '', genres }= req.query

	if(genres) {
	  if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
	    return res
	      .status(400)
	      .send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
	  }
	}

	let results = playApps
        .filter(playApp => 
     		playApp
     			.genres
        );


    // updatedList = u.sort((a, b) => {
    //         const formatted = capitalize(sort);
    //         return a[formatted] > b[formatted] ? 1 : a[formatted] < b[formatted] ? -1 : 0;

	res
		.json(results);
});




app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});