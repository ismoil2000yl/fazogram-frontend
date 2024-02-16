import { authRoutes, privateRoutes } from "./index";
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import NotFound from '../pages/not-found'
import Layout from '../components/layout'
import { useSelector } from 'react-redux'

const appRoutes = (routes) => {
    return routes.map((route, key) => (
        <React.Fragment key={key}>
            <Route
                path={route.path}
                element={<Suspense fallback="LOADING...">{route.element}</Suspense>}
            />
            {route.children && appRoutes(route.children)}
        </React.Fragment>
    ));
};

const routesWrapper = () => {
    const user = useSelector(state => state.user)
    // console.log(user)
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            {user?.username ? (
                <Route path="/" element={<Layout />}>
                    {appRoutes(privateRoutes)}
                </Route>
            ) : (
                appRoutes(authRoutes)
            )}
        </Routes>
    );
    // return <Routes>{appRoutes(privateRoutes)}</Routes>;
};

export default routesWrapper;