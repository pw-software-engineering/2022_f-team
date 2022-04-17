import React, { createContext } from "react";
import { UserType } from "./UserType";

export interface UserContextInterface {
    isAuthenticated: boolean,
    authApiKey: string,
    userType: UserType | null,
    login: (authApiKey: string) => void,
    logout: () => void,
}

export const UserContext = createContext<UserContextInterface | null>(null);

export interface UserProviderProps {
    userType: UserType,
}

export class UserProvider extends React.Component<UserProviderProps> {
    constructor(props: UserProviderProps) {
        super(props);

        this.setState({
            isAuthenticated: false,
            authApiKey: "",
            login: this.login,
            logout: this.logout,
            userType: props.userType,
        });
    }

    login = (authApiKey: string) => {
        this.setState({
            isAuthenticated: true,
            authApiKey: authApiKey
        });
    };

    logout = () => {
        this.setState({
            isAuthenticated: false,
            authApiKey: ""
        });
    };


    state = {
        isAuthenticated: false,
        authApiKey: "",
        login: this.login,
        logout: this.logout,
        userType: null,
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
