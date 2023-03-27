import axios from "axios";
import { useState } from "react";

export default UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => setEmail(e);
    const handlePasswordChange = (e) => setPassword(e);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/auth/login', {email, password})
        .then(response => {})
        .catch(error => {});
    }


}