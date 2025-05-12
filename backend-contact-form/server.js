const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 5500;

// Middleware para manejar datos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal para servir la página HTML (si es necesario)
app.get('/', (req, res) => {
  res.send('¡Backend en funcionamiento!');
});

// Ruta para el formulario de contacto
app.post('/contact', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configuración del transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio si lo prefieres
    auth: {
      user: 'tu-correo@gmail.com', // Tu correo de Gmail
      pass: 'tu-contraseña-o-app-password', // Contraseña o app password (si usas autenticación en 2 pasos)
    },
  });

  // Configuración del correo
  const mailOptions = {
    from: email,
    to: 'lverabracamonte@gmail.com', // El correo al que quieres recibir los mensajes
    subject: `Nuevo mensaje de ${nombre}`,
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje:\n${mensaje}`,
  };

  // Enviar correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Hubo un error al enviar el mensaje.');
    }
    res.status(200).send('Mensaje enviado correctamente.');
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
