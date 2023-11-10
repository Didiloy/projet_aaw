import React from "react";
export default function Login() {
  window.location.href = "http://localhost:3000/";
  return <div></div>;
}
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

//TODO appeler serveur avec accessToken et tokenType    ---->   vérifie si le user existe deja -> si oui modifie le token est sa date  -- sinon créer un user
