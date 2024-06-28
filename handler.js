const AWS = require('aws-sdk');

exports.hello = async (event) => {
  const bucketName = 'fetchdataforpoc';
  const key = 'dummtText.txt';

  const s3 = new AWS.S3();

  const params = {
    Bucket: bucketName,
    Key: key
  };

  try {
    const data = await s3.getObject(params).promise();

    console.log('Data retrieved from S3:', data.Body.toString());
    const dataString = data.Body.toString(); 

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Data retrieved successfully!',
        data: dataString
      })
    };
  } catch (err) {
    console.error('Error fetching data from S3:', err);

    if (err.code === 'NoSuchKey') {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'File not found in S3 bucket',
          statusCode: 404,
          input: event
        })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'hello world',
          statusCode: 500,
          input: event
        })
      };
    }
  }
};