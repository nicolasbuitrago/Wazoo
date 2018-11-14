import React from "react";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
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

  // componentDidMount = () => this.onInit(this.props);

  // onInit = (props) => props.fetchRestaurants();

  // componentWillMount = () => {
  //   this.props.fetchRestaurants().then(response=> {
  //     this.setState({restaurants: response.data});
  //   });
  // }

  click = () => {
    console.log(this.props)
  }

  render() {
    const {restaurants} = this.state;
    return (
      <div>
        <NavBar/>
        <Map restaurants={restaurants} />
      </div>
    );
  }
}

// DashboardPage.propTypes = {
//   fetchRestaurants: PropTypes.func.isRequired,
//   restaurants: PropTypes.arrayOf(
//     PropTypes.object.isRequired
//   ).isRequired
// }

// function mapStateToProps(state) {
//   return {
//     isConfirmed: !!state.user.confirmed,
//     restaurants: state.restaurants
//  };
// }

export default DashboardPage;

// export default connect(mapStateToProps, { fetchRestaurants })(DashboardPage);
