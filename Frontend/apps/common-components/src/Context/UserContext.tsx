import React, { createContext } from "react";

export interface UserContextInterface {
    isLogged: boolean,
    username: string,
    password: string,
    authApiKey: string,
    login: (username: string, password: string, authApiKey: string) => void,
    logout: () => void,
}

export const UserContext = createContext<UserContextInterface | null>(null);

export class UserProvider extends React.Component {
    login = (username: string, password: string, authApiKey: string) => {
        this.setState({
            isLogged: true,
            username: username,
            password: password,
            authApiKey: authApiKey
        });
    };

    logout = () => {
        this.setState({ isLogged: false });
    };

    state = {
        isLogged: false,
        username: "",
        password: "",
        authApiKey: "",
        login: (_: string, __: string, ___: string) => { },
        logout: () => { },
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export const UserConsumer = UserContext.Consumer;
