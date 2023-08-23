import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import UserForm from './components/UserForm';
import DataGridPage from './components/DataGridPage';
import DepartmentList from './components/DepartmentList';
import './App.css';
import { departmentData } from './components/departmentData';


const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={UserForm} />
        <Route path="/second" exact component={DataGridPage} />
        <Route path="/second-page" exact>
          {/* Pass the department data as a prop */}
          <DepartmentList data={departmentData} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
