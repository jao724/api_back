import tokenSecret from '../config.js'
import  jwt  from "jsonwebtoken";

function createAccesstoken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      tokenSecret,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if(err) reject(err);
        resolve(token)
      }
    );
  });
}

export default createAccesstoken
