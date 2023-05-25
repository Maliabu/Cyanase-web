import { TOKEN } from "../apis";

const Logout = () => {
    let token = TOKEN;
    localStorage.removeItem(token);
    window.location.pathname = "/"
}

export default Logout;