const http = require('http');
// a quick script to test session persistence
async function testSession() {
    const req = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'username=test2&email=test2@test.com&password=password',
        redirect: 'manual'
    });

    const cookies = req.headers.get('set-cookie');
    console.log("Signup set-cookie:", cookies);

    const debug = await fetch('http://localhost:8080/debug-session', {
        headers: { 'Cookie': cookies }
    });
    console.log("Debug session after signup:", await debug.json());
}
testSession();
