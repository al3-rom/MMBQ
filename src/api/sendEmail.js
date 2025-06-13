import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'viaconectaco@gmail.com', 
    pass: 'fdfw uaco jaud ptvh'
  }
});

app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'viaconectaco@gmail.com',
    to: email,
    subject: '¡Gracias por suscribirte!',
    text: '¡Hola! Gracias por unirte a ViaConecta.'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

app.listen(3001, () => {
  console.log('Servidor de correo escuchando en http://localhost:3001');
});
