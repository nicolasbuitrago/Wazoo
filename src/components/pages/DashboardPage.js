import React from "react";
import NavBar from '../NavBar';
import Map from '../Map';

class DashboardPage extends React.Component {

  render() {
    return (
      <div>
        <NavBar/>
        <Map/>
      </div>
    );
  }
}

export default DashboardPage;
