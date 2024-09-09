const port = process.env.PORT || 9999
const secretKey = process.env.SecretKey || 'abcdefg'
const database_url = process.env.Database_url || 'mongodb://127.0.0.1:27017/nftTesting'
const SignMessage = 'Click to sign in and accept the our Terms of Service. This request will not trigger a blockchain transaction or cost any gas fees.'
const backURL = process.env.backURL||"http://localhost:9999"
module.exports = {
    port,
    secretKey,
    database_url,
    SignMessage,
    backURL
}