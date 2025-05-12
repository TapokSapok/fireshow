import express from 'express';
import cors from 'cors';
import { formReqSchema } from './schemas';
import 'dotenv/config';
import nodemailer from 'nodemailer';

export const app = express();
app.use(cors());
app.use(express.json());

const sender = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

app.post('/api/form-request', async (req, res) => {
	try {
		const formReq = formReqSchema.parse(req.body);

		res.send({ status: true });

		const mailRes = await sender.sendMail({
			from: `"Заявки" <${process.env.SMTP_USER}>`,
			to: process.env.SMTP_TO,
			subject: `Заявка по форме: ${formReq.name} | ${formReq.patronymic} | ${formReq.phoneNumber ?? formReq.email}`,
			html: `
<h2>Заявка</h2>  
<ul>
	<li style="font-size: 20px;">Имя: ${formReq.name}</li>
	<li style="font-size: 20px;">Фамилия: ${formReq.name}</li>
	<li style="font-size: 20px;">Отчество: ${formReq.patronymic}</li>
	<li style="font-size: 20px;">Номер телефона: ${formReq.phoneNumber ?? 'Не указан'}</li>
	<li style="font-size: 20px;">Почта: ${formReq.email ?? 'Не указана'}</li>
</ul>`,
		});

		console.log({ formReq, response: mailRes.response });
	} catch (error) {
		console.error(error);
		res.send(error);
	}
});

app.listen(process.env.APP_PORT, err => {
	if (err) return console.log(err);
	console.log(`Back started on ${process.env.APP_PORT} port`);
});
