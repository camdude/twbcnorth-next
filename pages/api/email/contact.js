const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendContactEmail(req, res) {
  if (req.body.token !== process.env.API_EMAIL_SECRET) {
    console.log("Invalid Token");
    return res.status(401).json({ message: "Invalid Token" });
  }
  const recipient = req.body.recipient;

  const messages = [
    {
      from: `dev@cameronclifford.com`,
      to: `${recipient.name} <${recipient.email}>`,
      subject: "Message Confirmation From TWBC North",
      html: `
        <p>Thankyou for getting in contact with us. This is to let you know we have recieved your message and will try to get back to you as soon as possible.</p>
        <table style="width:100%">
            <tr>
                <td><b>Name:</b></td>
                <td>${recipient.name}</td>
            </tr>
            <tr>
                <td><b>Email:</b></td>
                <td>${recipient.email}</td>
            </tr>    
            <tr>
                <td><b>Your Message:</b></td>
                <td>${recipient.message}</td>
            </tr>
        </table>
        `,
    },
    {
      from: "twbcnorth.com <dev@cameronclifford.com>",
      to: `TWBC North <${req.body.adminEmail}>`,
      subject: "New Contact Message From TWBC North",
      html: `
        <p>You have a new contact message from twbcnorth.com. Please see the details below</p>
        <table style="width:100%">
            <tr>
                <td><b>Name:</b></td>
                <td>${recipient.name}</td>
            </tr>
            <tr>
                <td><b>Email:</b></td>
                <td>${recipient.email}</td>
            </tr>    
            <tr>
                <td><b>Your Message:</b></td>
                <td>${recipient.message}</td>
            </tr>
        </table>
        `,
    },
  ];

  await sgMail
    .send(messages)
    .then(() => {
      console.log(
        `New contact received and confirmation sent to ${recipient.email}`
      );
      return res.status(200).json();
    })
    .catch((error) => {
      console.error(error);
      return res.status(error.code).json(error.message);
    });
}
