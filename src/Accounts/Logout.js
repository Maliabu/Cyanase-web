import { TOKEN } from "../apis";

const Logout = (props) => {
    let token = TOKEN;
    localStorage.removeItem(token);
    window.location.pathname = "/"
    setTimeout(() => {
        props.countSub(0)
    }, 3000)
}

export default Logout;