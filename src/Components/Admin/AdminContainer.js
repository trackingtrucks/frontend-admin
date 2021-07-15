import React, { useEffect, useState, useContext } from 'react';
import * as Api from '../../Api';
import TokenCard from './TokenCard';
import UserCard from './UserCard';
import { Row } from 'react-bootstrap';
import UserDelete from './UserDelete';

function AdminContainer({ AuthContext }) {
    const { get } = useContext(AuthContext);
    const [tokens, setTokens] = useState([]);
    const [users, setUsers] = useState([]);
    const getTokens = async () => {
        const { data } = await Api.getTokens({ accessToken: get('at') });
        setTokens(data.tokens);
    }
    const getUsers = async () => {
        const { data } = await Api.getAdmins({ accessToken: get('at') });
        setUsers(data.admins);
    }
    useEffect(() => {
        getTokens();
        getUsers();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="admin-container">
            {tokens.length !== 0 && <div id="token-list">
                <p>Hay <b>{tokens.length}</b> token(s) activos</p>
                <Row xs={2} md={4}>
                    {tokens.map((token) => (
                        <TokenCard token={token} key={token._id} AuthContext={AuthContext} getTokens={getTokens} />
                    ))}
                </Row>
                <hr />
            </div>}

            {users.length !== 0 && <div id="user-list">
                <p>Hay <b>{users.length}</b> admins(s) registrados</p>
                <Row xs={2} md={4}>
                    {users.map((user) => (
                        <UserCard user={user} key={user._id} AuthContext={AuthContext} getUsers={getUsers} />
                    ))}
                </Row>
            </div>}
            <hr />
            <div id="delete-user">
                <UserDelete AuthContext={AuthContext} getUsers={getUsers} users={users}/>
            </div>
        </div>
    )
}

export default AdminContainer
