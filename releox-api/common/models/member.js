"use strict";

const actionMailer = require("loopback-action-mailer");

const getUrl = () => "http://localhost:3000";

const emailConfig = {
  appName: "Test app",
  signature: "Test app",
  from: "example@example.com"
};

module.exports = Member => {
  Member.beforeRemote("register", (ctx, _, next) => {
    ctx.emailConfig = {
      redirect: `${getUrl()}/confirm`,
      from: emailConfig.from,
      subject: `Kiitos rekisteröitymisestä | ${emailConfig.appName}`,
      templateData: {
        signature: emailConfig.signature,
        buttonText: "Hyväksy kutsu",
        lines: [
          'Tervetuloa käyttämään QMClouds sovellusta. Tässä sinulle ohjeet sovelluksen käyttöön <a href="https://qmclouds.com/ukk/">Lisätietoa ja käyttöohjeita</a>.',
          'Voit lähettää kysymyksesi sähköpostitse osoitteeseen <a href="mailto:support@qmclouds.com">support@qmclouds.com</a>'
        ]
      }
    };
    return next();
  });

  Member.beforeRemote("invitation", (ctx, _, next) => {
    ctx.emailConfig = {
      redirect: `${getUrl()}/accept-invitation`,
      from: emailConfig.from,
      subject: `Kutsu | ${emailConfig.appName}`,
      templateData: {
        signature: emailConfig.signature,
        buttonText: "Hyväksy kutsu",
        lines: [
          `Sinut on kutsuttu käyttämään ${emailConfig.appName}:a`,
          "Vieraile sivulla ja hyväksy kutsu"
        ]
      }
    };
    next();
  });

  Member.on("resetPasswordRequest", info => {
    const { id, userId } = info.accessToken;
    actionMailer(Member, {
      redirect: `${getUrl()}/reset-password?access_token=${id}&user=${userId}`,
      from: emailConfig.from,
      to: info.email,
      subject: `Vaihda salasana | ${emailConfig.appName}`,
      templateData: {
        signature: emailConfig.signature,
        buttonText: "Vaihda salasana",
        lines: [
          `Hei, ${info.user.name}.`,
          "Vastaanotimme pyynnön salasanan vaihtamisesta. Mikäli et tehnyt pyyntöä, sinun ei tarvitse tehdä mitään. Muussa tapauksessa voit vaihtaa salasanan klikkaamalla alla olevaa linkkiä"
        ]
      }
    });
  });
};
