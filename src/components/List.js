import React from 'react';
import { Grid, Search, Button, Icon } from 'semantic-ui-react';

class Restaurant extends React.Component {

    onClick=()=>{
        console.log(this.props.id);
        this.props.fly(this.props.id);
    }

    addFav = () => {
        this.props.addFav(this.props._id);
    }

    removeFav = () => {
        this.props.removeFav(this.props._id);
    }

    render() {
        return (
        <div id={'item-'+this.props.id} className='item'>
            <h4  className='title' onClick={this.onClick}>{this.props.name}</h4>
            {this.props.isFav(this.props._id)?
            <Icon name='heart' className='fav' color='red' onClick={this.removeFav} />
            :
            <Icon name='heart' className='fav' color='grey' onClick={this.addFav} />
            }
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

    createList(){
        var data = this.props.getRests();
        // console.log(data)
        let list = [];
        // Iterate through the list of stores
        for (var i = 0; i < data.length; i++) {
            var currentFeature = data[i];
            // Shorten data.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = currentFeature.properties;

            list.push(
                <Restaurant 
                id={i} 
                name={prop.name} 
                fly={this.props.fly} 
                isFav={this.props.isFav}
                addFav={this.props.addFav}
                removeFav={this.props.removeFav}
                _id={currentFeature._id}
                />
            );
        }
        return list;
    }

    setAll=()=> {
        this.props.setRests('all');
        this.createList();
    }

    setFavs=()=> {
        this.props.setRests('favs');
        this.createList();
    }

  render() {
    return (
    <div className='sidebar'>
        <div className='heading'>
            <h1>Restaurants</h1>
        </div>
        <Grid columns={2}>
        <Grid.Column width={1}/>
            <Grid.Column width={8}>
            <Search/>
            </Grid.Column>
            <Grid.Column width={6}>
                <Button className='bLeft' size='tiny' attached='right' onClick={this.setFavs} >Favs</Button>
                <Button className='bLeft' size='tiny' attached='left' onClick={this.setAll} >All</Button>
            </Grid.Column>
        </Grid>
        <div id='listings' className='listings'>{this.createList()}</div>
    </div>
    );
  }
}

export default List;