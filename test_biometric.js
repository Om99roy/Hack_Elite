const http = require('http');

const data = JSON.stringify({
  biometricTemplate: 'test123',
  deviceFingerprint: 'test456'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/biometric-verify',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Origin': 'http://192.168.0.139:3000',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();
