
const testAdminAPI = async () => {
    try {
        console.log('1. Logging in as Admin...');
        const loginRes = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@gardenhub.com',
                password: 'adminpassword'
            })
        });

        if (!loginRes.ok) {
            throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
        }

        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('   Login successful. Token received.');

        console.log('2. Fetching All Users...');
        const usersRes = await fetch('http://localhost:5000/api/users', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!usersRes.ok) {
            const err = await usersRes.text();
            throw new Error(`Fetch Users failed: ${usersRes.status} ${usersRes.statusText} - ${err}`);
        }

        const usersData = await usersRes.json();
        console.log(`   Success! Fetched ${usersData.length} users.`);

        console.log('3. Fetching Stats...');
        const statsRes = await fetch('http://localhost:5000/api/users/stats', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!statsRes.ok) {
            const err = await statsRes.text();
            throw new Error(`Fetch Stats failed: ${statsRes.status} ${statsRes.statusText} - ${err}`);
        }

        const statsData = await statsRes.json();
        console.log('   Success! Stats:', statsData);

    } catch (error) {
        console.error('ERROR:', error);
    }
};

testAdminAPI();
