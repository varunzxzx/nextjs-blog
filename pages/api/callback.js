const client_id = "140ebdfe5e3aef2";
const client_secret = "31f97d038896b93955feb20a2be77d4f738";
// const tiny = require("tiny-json-http");
// const fetch = require("node-fetch")
const tokenUrl = "https://github.com/login/oauth/access_token";

export default async (req, res) => {
  const data = {
    code: req.query.code,
    client_id,
    client_secret,
  };

  try {
    // const { body } = await tiny.post({
    //   url: tokenUrl,
    //   data,
    //   headers: {
    //     // GitHub returns a string by default, ask for JSON to make the reponse easier to parse.
    //     Accept: "application/json",
    //   },
    // });
    // const body = await fetch(tokenUrl, {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    //   headers: {
    //     // GitHub returns a string by default, ask for JSON to make the reponse easier to parse.
    //     "Accept": "application/json",
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.json())
    // .catch(e => console.log('Connection error', e));
    const postMsgContent = {
      token: "body.access_token",
      provider: "github",
    };

    // This is what talks to the NetlifyCMS page. Using window.postMessage we give it the
    // token details in a format it's expecting
    const script = `
        <script>
        (function() {
          function recieveMessage(e) {
            console.log("recieveMessage %o", e);

            // send message to main window with the app
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(postMsgContent)}',
              e.origin
            );
          }

          window.addEventListener("message", recieveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
        </script>`;

    return res.send(script);
  } catch (err) {
    // If we hit an error we'll handle that here
    console.log(err);
    // res.redirect("/?error=😡");
    res.send("error: " + err);
  }
};
