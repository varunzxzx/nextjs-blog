const client_id = process.env.OAUTH_CLIENT_ID;
const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;

export default (req, res) => {
  return res.redirect(authUrl);
};
