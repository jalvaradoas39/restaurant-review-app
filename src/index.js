const path = require('path');
const express = require('express');

const app = express();





const PUBLIC_DIRECTORY_PATH = path.join(__dirname, '../public');
app.use(express.static(PUBLIC_DIRECTORY_PATH));






const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
