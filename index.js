// const http = require('http');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT ?? 6000;

// const server = http.createServer(app);

app.listen(PORT, () => {
   console.log(`listening on port http://localhost:${PORT}`);
});
