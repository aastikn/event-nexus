import {styles} from './page.module.css';

//firebase imports
import { auth, googleProvider } from "../../../firebase";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <>
        <form>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required></input>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required></input>
            <button type="submit">Login</button>
        </form>
    </>
}