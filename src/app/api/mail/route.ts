import { NextResponse } from "next/server";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: Request) {
  const {
    name,
    email,
    message,
  }: { name: string; email: string; message: string } = await request.json();
  const msg = `Name: ${name}\r\n Email: ${email}\r\n Message: ${message}`;
  const data = {
    to: "rob@anywhen.com",
    from: "rob@anywhen.com",
    subject: `${name.toUpperCase()} sent you a message from Contact Form`,
    text: `Email => ${email}`,
    html: msg.replace(/\r\n/g, "<br>"),
  };
  try {
    await sgMail.send(data);

    return NextResponse.json({
      message: "Your message was sent successfully.",
    });
  } catch (err) {
    return NextResponse.json({
      message: `There was an error sending your message. ${err}`,
    });
  }
}
