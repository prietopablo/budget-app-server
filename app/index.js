const express = require('express');
const router = require('./router');
const app = express();


const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((_, res) => {
   res.status(404).render('404');
});

app.listen(PORT, () => {
   console.log(`listening on port http://localhost:${PORT}`);
})

