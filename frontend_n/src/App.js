
import AddEmployee from './components/AddEmployee';
import AllEmployees from './components/AllEmployees';
import Test from './components/test';
import UpdateEmployee from './components/UpdateEmployee';

import AddPayroll from './components/AddPayroll';
import AllPayrolls from './components/AllPayrolls';
import UpdatePayroll from './components/UpdatePayroll';

import Leave_stat from './components/leave_stat';

import AddLeave from './components/AddLeave';
import UpdateLeave from './components/UpdateLeave';

import NavBarMain1 from './components/NavBarMain1';
import NavBarMain2 from './components/NavBarMain2';


import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export default class App extends Component {

  /* Render two components when the URL path is the same

  <Route path='/medicinerequests/view' element={
              <div>
                <ViewMedicineDeliveryRequests />
                <ViewMedicineDeliveryRequestStatus />
              </div>
  } />
  */

  render() {

    return (

      <BrowserRouter>
        
        <NavBarMain1/>
        <NavBarMain2 />

        <div className="">
          <Routes>
            <Route path='/' exact Component={AllEmployees}></Route>
            <Route path='/' exact Component={AddEmployee}></Route>
            

            <Route path="leave/add"  exact Component={AddLeave} />
            <Route path="leave/get/:id" exact Component={UpdateLeave} />
            <Route path="leave/" exact Component={Leave_stat} />

            <Route path="payroll/add"  exact Component={AddPayroll} />
            <Route path="payroll/get/:id" exact Component={UpdatePayroll} />
            <Route path="payroll/" exact Component={AllPayrolls} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
