module.exports = (req, res) => {
    // Your serverless function logic here

    // Enable CORS for specific origins
    res.setHeader('Access-Control-Allow-Origin', 'https://metoyou.vercel.app');

    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    // Allow specific HTTP headers
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Accept, Content-Type');

    // Set how long the preflight request can be cached (in seconds)
    // res.setHeader('Access-Control-Max-Age', '3600');

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

};
