const AWS = require('aws-sdk');

const SES = new AWS.SES();

module.exports.processResponse = (body, statusCode) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST'
    };
  
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: headers
    };
};

/**
 * 
 * @param {object} data 
 * @property {string} data.subject
 * @param {string} contentHtml 
*/
module.exports.sendMail = async (data, contentHtml) => {
    const params = {
        Destination: {
          ToAddresses: [data.to.toLowerCase()],
        },
        Message: {
          Body: {
            Html: {
                Charset: 'UTF-8',
                Data: contentHtml,
            },
          },
          Subject: {
            Data: data.subject,
          },
        },
        Source: `glauber17230@gmail.com`,
    };

    await SES.sendEmail(params).promise();

    return true;
};
