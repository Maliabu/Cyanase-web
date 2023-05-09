import React, { useState } from 'react';

export default function App() {
    const [userInfo, setUserInfo] = useState({
        user: {
            name: 'ravi',
            email: 'ravi@gmail.com',
            phone: [{ primary: '9999999990' }, { alternate: '9999998880' }]
        }
    });



    const handleChange = e => {
        console.log(e.target.name);
        let arrPhone = userInfo.user.phone;
        (e.target.name === 'primary' || e.target.name === 'alternate') &&
        arrPhone.map(x => (x.hasOwnProperty(e.target.name)) && (x[e.target.name] = e.target.value))

        console.log(arrPhone)
        setUserInfo(prevState => {
            return {
                user: {
                    ...prevState.user,
                    [e.target.name]: e.target.value,
                    phone: arrPhone
                }
            };
        });
    };
    const {
        name,
        email,
        phone: [{ primary }, { alternate }]
    } = userInfo.user;

    console.log(userInfo);

    return ( <
        div className = "App" >
        Name: < input name = "name"
        value = { name }
        onChange = { handleChange }
        /> <
        br / >
        Email: < input name = "email"
        value = { email }
        onChange = { handleChange }
        /> <
        br / >
        Primary: < input name = "primary"
        value = { primary }
        onChange = { handleChange }
        /> <
        br / >
        Alternate: { ' ' } <
        input name = "alternate"
        value = { alternate }
        onChange = { handleChange }
        /> <
        br / >
        <
        /div>
    );
}