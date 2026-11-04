import { useState, useEffect } from "react";

function Users(){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("https://front6.edukacija.online/backend/wp-json/wp/v2/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1>Korisnici</h1>
            <table className="row">
                {users.map(user => (
                    <tr className="col-12 mb-3" key={user.id}>
                        <td>
                            <img src={user.avatar_urls['96']} alt={user.name} width="96" height="96" />
                        </td>
                        <td>
                            <h2>{user.name}</h2>
                        </td>
                        <div></div>
                        <td>
                            <h3>{user.slug}</h3>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Users;