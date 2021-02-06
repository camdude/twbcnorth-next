const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function completeRegistration(req, res) {
  if (req.body.token !== process.env.API_REGISTER_SECRET) {
    console.log("Invalid Token");
    return res.status(401).json({ message: "Invalid Token" });
  }
  const registrationData = req.body.recipient;
  const recipient = {
    name: registrationData.find((obj) => obj.name == "First Name").value,
    email: registrationData.find((obj) => obj.name == "Email").value,
  };

  const messages = [
    {
      from: "dev@cameronclifford.com",
      to: `${recipient.name} <${recipient.email}>`,
      subject: "Registration For TWBC Conference",
      html: `
        <p>Thankyou for registering for this years conference. We will send you another email once we have received your payment to confirm your registration.</p>
        <p>For your records, this is the information you have provided us with. If anything appears to be incorrect please <a href="mailto:twbcnorth@outlook.com">contact us.</a></p>
        <table style="width:100%">
          ${registrationData
            .map((i) => {
              return `<tr>
                      <td><b>${i.name}:</b></td>
                      <td>${i.value}</td>
                  </tr>`;
            })
            .join("\n")}
        </table>
        `,
    },
    {
      from: "dev@cameronclifford.com",
      to: `TWBC North <cmrnclffrd@gmail.com>`,
      subject: "New Registration For TWBC North",
      html: `
        <p>You have a new registration from twbcnorth.com. Please see the details below</p>
        <table style="width:100%">
          ${registrationData
            .map((i) => {
              return `<tr>
                      <td><b>${i.name}:</b></td>
                      <td>${i.value}</td>
                  </tr>`;
            })
            .join("\n")}
        </table>
        `,
    },
  ];

  sgMail
    .send(messages)
    .then(() => {
      console.log("Registration emails sent");
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).json();
}
