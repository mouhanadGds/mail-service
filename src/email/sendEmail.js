import {emailTemplate} from './emailTemplate.js';
import { createTransport } from 'nodemailer';
import express from 'express';
import  bodyParser   from 'body-parser';
import cors from 'cors'
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res)=>{
  res.json({message:"Helathy"})
})
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;


    const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'gds.direct.server@gmail.com',
      pass: 'kihg oqps wued yhxn'
    }
  });

const adminMail="mouhanad.ahmed@gds-direct.com"

    // send mail with defined transport object
     transporter.sendMail({
      from: '"GDS mail service 👻" <gds.direct.server@gmail.com>', // sender address
      to: adminMail, // list of receivers
      subject: "New Lead", // Subject line
    //   text: "Hello world?", // plain text body
      html:emailTemplate({message,name,email}), // html body
    });
    console.log("Message sent: %s",message, "to",adminMail );
    res.json({message:"success"})
});

app.post('/verify-recaptcha', async (req, res) => {
  const secretKey = '6Lc-fS4qAAAAACyESUniYE28omEZOK5YuhMHDrm-';
  const token = req.body.token;

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  console.log("data",data)
  if (data.success) {
      res.json({ score: data.score });
    } else {
      res.status(400).json({ error: 'reCAPTCHA verification failed' });
    }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});