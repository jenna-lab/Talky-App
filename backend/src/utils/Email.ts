import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function createTransporter(config: any) {
  const transporter = nodemailer.createTransport(config);
  return transporter;
}

let configurations = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  requireTLS: true,
  auth: {
    user: "jensam209@gmail.com",
    pass: "qrct volw nitt ccpo",
  },
};

const sendMail = async (messageoption: any) => {
  const transporter = await createTransporter(configurations);
  await transporter.verify();
  await transporter.sendMail(messageoption, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log(info.response);
  });
};

export default sendMail;
