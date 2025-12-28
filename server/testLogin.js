const testLogin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'viewer@gardenhub.com',
                password: 'password123'
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login Successful!');
            console.log('Token:', data.token ? 'Received' : 'Missing');
        } else {
            console.log('Login Failed:', response.status, data);
        }
    } catch (error) {
        console.log('Login Error:', error.message);
    }
};

testLogin();
