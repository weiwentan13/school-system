import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Attendance from './pages/attendance';
import AssignmentDetail from './pages/assignmentDetail';
import AssignmentList from './pages/assignmentList';
import Statistic from './pages/statistics';
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from './pages/profile';
import HeaderContainer from './containers/layout';

function PrivateRoute({ children, ...rest }) {
  const token = useSelector(state => state.auth.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token !== null ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function TeacherOnlyRoute({ children, ...rest }) {
  const token = useSelector(state => state.auth.token);
  const isTeacher = useSelector(state => state.auth.is_teacher);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token !== null && isTeacher ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/profile",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  const isStudent = useSelector(state => state.auth.is_student);
  return (
    <Router>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/signup'>
        <Signup />
      </Route>
      
      <Route exact path={["/assignment", "/assignment/:code", "/attendance/:year", "/statistics", "/profile"]}>
        <HeaderContainer>
          <PrivateRoute exact path='/assignment'>
            <AssignmentList isStudent={isStudent} />
          </PrivateRoute>

          <PrivateRoute exact path='/profile'>
            <Profile isStudent={isStudent} />
          </PrivateRoute>

          <PrivateRoute exact path='/assignment/:code'>
            <AssignmentDetail isStudent={isStudent}/>
          </PrivateRoute>

          <TeacherOnlyRoute exact path='/attendance/:year'>
            <Attendance />
          </TeacherOnlyRoute>
          
          <PrivateRoute exact path='/statistics'>
            <Statistic />
          </PrivateRoute>
        </HeaderContainer>
      </Route>
    </Router>
  );
}

export default App;
