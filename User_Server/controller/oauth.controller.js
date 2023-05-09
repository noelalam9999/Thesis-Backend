const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const oauthRegsiter = async (req, res, next) => {
  const { code } = req.body;
  const url = new URL("https://oauth2.googleapis.com/token");
  url.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID);
  url.searchParams.append("client_secret", process.env.GOOGLE_CLIENT_SECRET);
  url.searchParams.append("code", code);
  url.searchParams.append("grant_type", "authorization_code");
  url.searchParams.append(
    "redirect_uri",
    `${process.env.BASE_FRONTEND_URL}/oauth_google`
  );
  try {
    const access_token = await axios.post(url.toString(), {});
    res.status(200);
    res.send({ access_token: access_token.data.access_token });
  } catch (error) {
    console.log(error.response);
    res.status(500);
    res.send({ errorMessage: "Something went wrong" });
  }
};

const oauthLogin = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      existingUser = await User.create({
        email,
        name,
      });
    }
    const access_token = jwt.sign({ _id: existingUser._id }, SECRET_KEY);
    res.status(201).send({ access_token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: "Something went wrong" });
  }
};

module.exports = { oauthRegsiter, oauthLogin };
