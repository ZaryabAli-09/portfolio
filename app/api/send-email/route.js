import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { message, email } = await req.json(); //getting data from body

    // setting up smtp connection to send mails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // mail option configuration
    const mailOption = {
      from: "Zaryab",
      to: "zaryabkhan248@gmail.com",
      subject: `Form submitted on portfolio by ${email}`,
      text: message,
    };

    // sending mail
    await transporter.sendMail(mailOption);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error sending email", error: error.message }),
      {
        status: 500,
      }
    );
  }
}
