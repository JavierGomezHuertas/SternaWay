# MailJet

MailJet es un servicio de envío de mails que en su plan gratuito permite enviar hasta 6000 mails por mes y 200 por día.

## Pasos para enviar mails con MailJet

### Crear una cuenta

Vamos a [MailJet](https://www.mailjet.com/) y creamos una cuenta.
El mail con el que nos registramos debe ser un mail válido, porque nos van a pedir que lo verifiquemos.
Una vez verificado el mail, ese es el único mail que podemos usar para enviar mails.

### Configurar el dominio

Si tenemos un dominio registrado, y queremos usarlo para enviar mails, vamos a [Sender domains & addresses](https://app.mailjet.com/account/sender?type=domain) y configuramos el dominio. Esto permitirá enviar mails desde cualquier mail con ese dominio.
Luego deberiamos ir a [Authentication Settings](https://app.mailjet.com/account/sender?type=auth) y configuramos la autenticación de SPF y DKIM para el dominio que estemos usando.
Esto mejorará la tasa de entrega de los mails ya que los proveedores de mail van a saber que los mails que enviamos son legítimos.

### Crear una API Key

Vamos a [API Keys](https://app.mailjet.com/account/apikeys) y creamos una API Key Privada. Anotarla porque esa es la unica vez que la podrán ver.

Copiamos la api key y la api secret y las guardamos en el `.env` en la raíz del proyecto.

### Instalar el paquete de MailJet

```bash
npm install node-mailjet
```

### Enviar un mail

```javascript
const mailjet = require("node-mailjet").apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

await mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "pilot@mailjet.com",
        Name: "Mailjet Pilot", // optional
      },
      To: [
        {
          Email: "passenger1@mailjet.com",
          Name: "passenger 1", // optional
        },
      ],
      Subject: "Your email flight plan!",
      TextPart:
        "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!", //Optional
      HTMLPart:
        '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
    },
  ],
});
```

### Otras opciones

- [MailJet API Reference](https://dev.mailjet.com/email/guides/getting-started/)
- [MailJet NodeJS API Wrapper](https://www.npmjs.com/package/node-mailjet)

## Recursos adicionales

### Sender Policy Framework (SPF)

Es un método de autenticación de emails, que asegura que el servidor de mail que envía el mail está autorizado a hacerlo en nombre del dominio del remitente.

Funciona agregando un registro TXT en el DNS del dominio del remitente, que contiene una lista de servidores de mail autorizados a enviar mails en nombre del dominio.

Los servidores de mail que reciben el mail pueden consultar el registro SPF del dominio del remitente y verificar que el servidor de mail que envía el mail está autorizado a hacerlo.

- [SPF en Wikipedia](https://es.wikipedia.org/wiki/Sender_Policy_Framework)

### DomainKeys Identified Mail (DKIM)

Es un método de autenticación de emails, que asegura que el contenido del mail no fue modificado desde que fue enviado por el remitente.

Funciona agregando un registro TXT en el DNS del dominio del remitente, que contiene una firma criptográfica del contenido del mail.

Los servidores de mail que reciben el mail pueden consultar el registro DKIM del dominio del remitente y verificar que el contenido del mail no fue modificado.

- [DKIM en Wikipedia](https://es.wikipedia.org/wiki/DomainKeys_Identified_Mail)

### Otras alternativas

- [Amazon SES](https://aws.amazon.com/es/ses/)
- [Mailgun](https://www.mailgun.com/)
- [MailChimp](https://mailchimp.com/)
- [SendGrid](https://sendgrid.com/)
- [Postmark](https://postmarkapp.com/)
- [SparkPost](https://www.sparkpost.com/)
- [Mailtrap](https://mailtrap.io/)

### Herramientas para testear mails

- [Ethereal](https://ethereal.email/)
- [Mailosaur](https://mailosaur.com/)
- [MailCatcher](https://mailcatcher.me/)
- [MailHog](https://github.com/mailhog/MailHog)
- [Mailtrap](https://mailtrap.io/)
- [MailSlurper](http://mailslurper.com/)
- [MailDev](https://maildev.github.io/maildev/)
