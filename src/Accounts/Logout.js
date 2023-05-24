import { TOKEN } from "../apis";

const Logout = () => {
    let token = TOKEN;
    localStorage.removeItem(token);
}

export default Logout;