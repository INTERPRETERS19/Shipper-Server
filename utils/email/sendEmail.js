const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const sgMail = require("@sendgrid/mail");
sgMail
  .setApiKey
  //have to type the key
  ();

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

// const nodemailer = require("nodemailer");
// const handlebars = require("handlebars");
// const fs = require("fs");
// const path = require("path");

// const sendEmail = async (email, subject, payload, template) => {
//   try {
//     // create reusable transporter object using the default SMTP transport
//     const transporter = nodemailer.createTransport({
//       host: "smtp.sendgrid.net",
//       auth: {
//         api_user: "app",
//         api_key:
//           "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",
//       },
//     });
//     const source = fs.readFileSync(path.join(__dirname, template), "utf8");
//     const compiledTemplate = handlebars.compile(source);
//     const options = () => {
//       return {
//         from: process.env.FROM_EMAIL,
//         to: email,
//         subject: subject,
//         html: compiledTemplate(payload),
//       };
//     };

//     transporter.sendMail(email, function (err, res) {
//       if (err) {
//         console.log(err);
//       }
//       console.log(res);
//     });

//     // Send email
//     // transporter.sendMail(options(), (error, info) => {
//     //   if (error) {
//     //     return error;
//     //   } else {
//     //     print(info);
//     //     return res.status(200).json({
//     //       success: true,
//     //     });
//     //   }
//     // });
//   } catch (error) {
//     return error;
//   }
// };

// /*
// Example:
// sendEmail(
//   "youremail@gmail.com,
//   "Email subject",
//   { name: "Eze" },
//   "./templates/layouts/main.handlebars"
// );
// */

module.exports = sendEmail;
