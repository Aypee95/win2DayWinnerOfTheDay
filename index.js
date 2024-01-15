import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function sendMail(body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL_ADDRESS,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL_ADDRESS,
    to: process.env.TARGET_EMAIL_ADDRESS,
    subject: "Winner of the day - Win2Day",
    text: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://www.win2day.at/gewinner-des-tages");
  const winnerOfTheDayElement = await page.waitForSelector(
    "table.table.tablesorter.tablesorter-default.table-jackpotwinner tbody tr td strong"
  );
  const winnerOfTheDay = await winnerOfTheDayElement.evaluate(
    (el) => el.textContent
  );

  await browser.close();

  const emailBody = `The winner of the day is: ${winnerOfTheDay}\nhttps://www.win2day.at/gewinner-des-tages`;

  console.log(emailBody);

  if (winnerOfTheDay === process.env.TARGET_WINNER_USERNAME) {
    sendMail(emailBody);
  }
})();
