import { sendMail } from './mail';

sendMail(
  'johnforexpio@gmail.com',
  'Test Email from Akuratama ICT',
  '<h1>This is a test email sent using Nodemailer!</h1><p>Welcome to Akuratama ICT.</p>',
);
