const {
    sendMail,
    processResponse,
  } = require('./helpers');

  const pug = require('pug')
  
  module.exports.handle = async (event) => {
    const payload = typeof event['Records'][0]['Sns']['Message'] === 'string'
        ? JSON.parse(event['Records'][0]['Sns']['Message']) : event['Records'][0]['Sns']['Message'];
  
    try {
      console.log('\n \n');
      console.log('EVENT DATA');
      console.log('----------------------------');
      console.log(payload);
      console.log('----------------------------');
      console.log('\n \n');

      const year = new Date().getFullYear();
      const HTML = pug.renderFile('./templates/index.pug', 
      { email: payload.email, password: payload.password, link: 'https://anajob.com.br', year})

      console.log('HTML')
      console.log(HTML)
      Object.assign(payload, {
          subject: 'Bem vindo a Ana Job',
          to: payload.email,
      })
  
      await sendMail(payload, HTML);
  
      return processResponse( {
          message: 'Email sent successfully',
          contact: event.body,
      }, 200 )
    } catch (error) {
        console.log('\n \n');
        console.log('ERROR');
        console.log('----------------------------');
        console.log(error);
        console.log('----------------------------');
        console.log('\n \n');
        return processResponse( `O erro consta no arquivo welcome.js`, 400 );
    }
  };
  