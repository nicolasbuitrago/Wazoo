import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavBar from '../NavBar';
import Map from '../Map';
// import { fetchRestaurants } from "../../actions/restaurants";

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants:[]
    };
    // this.componentWillMount();
  }

  // componentDidMount = () => this.click();

  // onInit = (props) => props.fetchRestaurants();

  // componentWillMount = () => {
  //   this.props.fetchRestaurants().then(response=> {
  //     this.setState({restaurants: response.data});
  //   });
  // }

  click = () => {
    console.log(this.props.email)
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Map email={this.props.email} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  email: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    email: state.user.email
 };
}

// export default DashboardPage;

export default connect(mapStateToProps, {  })(DashboardPage);
