import React from "react";
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {selectLastAttemptedRoute} from "../../../redux/routing/routing.selectors";
import {setLastAttemptedRoute} from "../../../redux/routing/routing.actions";
const notify = withReactContent(Swal);

const CoachRoute = ({ currentUser, lastAttemptedRoute, setLastAttemptedRoute, location,  component: Component, ...rest }) => {
    //Set the attempted route, i.e the route the user is trying to access
    if (location.pathname !== '/login' && location.pathname !== '/login#'){
        setLastAttemptedRoute(location.pathname);
    }

    let agent = false;
    if (currentUser){
        currentUser.roles.forEach(role => {
            if (role.role.name === 'agent'){
                agent = true;
            }
        });
    }

    return (
        <Route
            {...rest}
            render = {props => {
                if (agent){
                    return <Component { ...props } />;
                }else {
                    return <Redirect to='/login' />;
                }
             }}
        />
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    lastAttemptedRoute: selectLastAttemptedRoute
});

const mapDispatchToProps = dispatch => ({
    setLastAttemptedRoute: route => dispatch(setLastAttemptedRoute(route))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CoachRoute));