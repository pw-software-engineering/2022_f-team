import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import RouteProps from "./RouteProps";

export const PublicRoute = (props: RouteProps) => {
    if (props.isAuthenticated == null) {
        return (
            <Fragment>
                <Navigate to="/login" replace />
            </Fragment>
        );
    }
    if (props.isAuthenticated) {
        return (
            <Fragment>
                <Navigate to="/" replace />
            </Fragment>
        );
    }

    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};