import { post } from "../../helpers/api_helper";
import { LOGIN } from "./CONSTANTS";

export async function login({ email, password }) {
  return post(LOGIN, { email, password }).then(r => r);
}
