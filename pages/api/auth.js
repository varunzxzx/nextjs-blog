const client_id = "140ebdfe5e3aef6f4d22";
const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;

export default (req, res) => {
  res.redirect(authUrl);
};
