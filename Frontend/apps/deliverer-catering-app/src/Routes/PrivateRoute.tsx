import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import RouteProps from "./RouteProps";

export const PrivateRoute = (props: RouteProps) => {
    if (props.isAuthenticated == null || !props.isAuthenticated) {
        return (
            <Fragment>
                <Navigate to="/login" replace />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};