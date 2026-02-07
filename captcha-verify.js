/**
 * MODULE: Anti-Spam Verification
 * TASK: Verify that the user is human before allowing Sign-Up.
 * TOOLS: Node.js, Axios, Cloudflare Turnstile
 */

const axios = require('axios');

// The secret key provided by the captcha service
const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET;

async function verifyUser(token, ipAddress) {
    try {
        console.log("Verifying user token...");

        // 1. Send the token to the verification API
        const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            secret: CAPTCHA_SECRET_KEY,
            response: token,
            remoteip: ipAddress
        });

        // 2. Check the result
        const outcome = response.data;

        if (outcome.success) {
            console.log("✅ Success: User is human.");
            return true;
        } else {
            console.log("❌ Failed: Bot detected or token expired.");
            return false;
        }

    } catch (error) {
        console.error("System Error during verification:", error);
        return false;
    }
}

module.exports = { verifyUser };