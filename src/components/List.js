import React from 'react';
import { Search } from 'semantic-ui-react';

class Restaurant extends React.Component {

    onClick=()=>{
        console.log(this.props.id);
        this.props.fly(this.props.id);
    }

    render() {
        return (
        <div id={'item-'+this.props.id} className='item'>
            <p  className='title' onClick={this.onClick}>{this.props.name}</p>
        </div>
        );
    }
}

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            favorities: []
        };
    }

    componentWillMount = () => {
        const data = this.props.getRests();
        this.setState({
            restaurants:data.rests,
            favorities: data.favs
        });
    }

    createList(){
        var data = this.props.getRests();
        console.log(data)
        let list = [];
        // Iterate through the list of stores
        for (var i = 0; i < data.length; i++) {
            var currentFeature = data[i];
            // Shorten data.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = currentFeature.properties;

            list.push(<Restaurant id={i} name={prop.name} fly={this.props.fly}></Restaurant>);
        }
        return list;
    }

  render() {
    return (
    <div className='sidebar'>
        <div className='heading container'>
            <h1>Restaurantes</h1>
        </div>
        <Search/>
        <div id='listings' className='listings'>{this.createList()}</div>
    </div>
    );
  }
}

export default List;