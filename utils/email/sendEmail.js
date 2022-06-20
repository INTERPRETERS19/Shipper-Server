const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (email, subject, payload, template) => {
  console.log(email);
  console.log(process.env.FROM_EMAIL);

  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);

  const msg = {
    to: email, // Change to your recipient
    from: process.env.FROM_EMAIL, // Change to your verified sender
    subject: subject,
    html: compiledTemplate(payload),
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendEmail;
