const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar el motor de vistas EJS
app.set('view engine', 'ejs');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Middleware para manejar datos URL-encoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta GET para renderizar la página inicial
app.get('/', (req, res) => {
    res.render('index', { weather: null });
});

// Ruta POST para manejar la solicitud del formulario
app.post('/', async (req, res) => {
    const city = req.body.city;
    let weather = null;

    if (city) {
        const apiKey = 'e796693935e500a486ccae22b1f6dcce';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await axios.get(url);
            weather = response.data;
        } catch (error) {
            console.error(error);
        }
    }

    res.render('index', { weather });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


