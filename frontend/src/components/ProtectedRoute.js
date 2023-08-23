import CurrentUserContext from '../contexts/CurrentUserContext.js';
import React from 'react';
import { Navigate } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRouteElement = ({ element, ...props  }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    currentUser?.name ? element  : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRouteElement;
