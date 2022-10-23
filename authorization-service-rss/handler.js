'use strict';

module.exports.basicAuthorizerRSS = async (event, context, callback) => {
  console.log("Event: ", JSON.stringify(event))

  if (event['type'] !== 'TOKEN' || (event.headers && !event.headers.Authorization)) {
    callback('Unauthorized')
  }

  try {
    const authorizationToken = event.authorizationToken || event.headers.Authorization;

    const encodedCreds = authorizationToken.split(' ')[1];

    const buff = Buffer.from(encodedCreds, 'base64');

    const plainCreds = buff.toString('utf-8').split(':');
    const userName = plainCreds[0];

    const password = plainCreds[1];
   
    const storedUserPassword = process.env[userName];

    const effect = !storedUserPassword || storedUserPassword !== password ? 'Allow' : 'Deny';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    callback(null, policy);

  }
  catch (err) {
    callback(`Unauthorized: ${err.message}`)
  }
};

const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        }
      ]
    }
  };
}  
