import nodemailer from 'nodemailer';
export const sendEmail = async (emailTo, emailSubject, emailText) => {
  const transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });

  const mailOption = {
    from: '"Next js news portal 👻" <info@teamrabbil.com>', // sender address
    to: emailTo, // list of receivers
    subject: emailSubject, // Subject line
    text: emailText, // plain text body
  };
  return await transporter.sendMail(mailOption)
}