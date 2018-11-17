import React from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { Grid, Image, Segment, Button } from 'semantic-ui-react';
import NavBar from '../NavBar';

import './RestaurantPage.css'; // Imported css

class RestaurantPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reaction: false,
            isLike: false,
            likes: 0,
            dislikes: 0
        };
    }    

    componentWillMount = () => {
        const { props, email } = this.props.state;
        axios.post('/api/reactions/get', {id:props._id, email:email}).then(response => {
            const { resp } = response.data;
            this.setState({
                likes:resp.likes,
                dislikes:resp.dislikes
              });
            // console.log(resp.reaction);
            if(resp.reaction){
                // console.log('ENTRO');
                this.setState({
                    reaction: true,
                    isLike: resp.reaction.reaction
                });
            }
        });
    }

    reaction = (reaction) => {
        const { props, email } = this.props.state;
        axios.post('/api/reactions/add', {id:props._id, email:email, reaction:reaction}).then(response => {
            const { num } = response.data;
            if( reaction ){
                this.setState({
                    reaction: true,
                    isLike: true,
                    likes:num
                });
            }else{
                this.setState({
                    reaction: true,
                    isLike: false,
                    dislikes:num
                });
            }
        });
    }

    like = () => {
        this.reaction(true);
        // const { likes }
        this.setState({
            reaction: true,
            isLike:true
        });
    }

    dislike = () => {
        this.reaction(false);
        this.setState({
            reaction: true,
            isLike:false
        });
    }

    render() {
        const { reaction, isLike, likes, dislikes } = this.state;
        const { props } = this.props.state;
        return (
            <div>
                <NavBar/>
                <Grid className='ui container'>
                    <Grid.Column width={4}>
                        <Image src={props.image} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment.Group>
                            <Segment className='title'>
                                <h2>{props.name}</h2>
                            </Segment>
                            <Segment className='props'>
                                <h4>{props.description}</h4>
                                <p><b>Phone: </b>{props.phone}</p>
                                <p><b>Address: </b>{props.address}</p>
                                <p><b>City: </b>{props.city}</p>
                                <p><b>State: </b>{props.state}</p>
                                <p><b>Country: </b>{props.country}</p>
                            </Segment>
                        </Segment.Group>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Grid.Row><p></p>
                            <h3>Share your opinion:</h3>
                        </Grid.Row>
                        <Grid.Row>
                            {isLike && reaction?
                                <Button
                                    className='reaction'
                                    content='Like'
                                    icon='thumbs up outline'
                                    label={{ as: 'a', basic: true, content: likes }}
                                    labelPosition='right'
                                    disabled={reaction}
                                    onClick={this.like}
                                    color='blue'
                                />
                            :
                                <Button
                                    className='reaction'
                                    content='Like'
                                    icon='thumbs up outline'
                                    label={{ as: 'a', basic: true, content: likes }}
                                    labelPosition='right'
                                    disabled={reaction}
                                    onClick={this.like}
                                />
                            }
                        </Grid.Row>
                        <Grid.Row>
                            {!isLike && reaction?
                                <Button
                                    className='reaction'
                                    content='Dislike'
                                    icon='thumbs down outline'
                                    label={{ as: 'a', basic: true, content: dislikes }}
                                    labelPosition='right'
                                    disabled={reaction}
                                    onClick={this.dislike}
                                    color='red'
                                />
                            :
                                <Button
                                    className='reaction'
                                    content='Dislike'
                                    icon='thumbs down outline'
                                    label={{ as: 'a', basic: true, content: dislikes }}
                                    labelPosition='right'
                                    disabled={reaction}
                                    onClick={this.dislike}
                                />
                            }
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                {/* <Grid className='container commentsSection'>
                    <Grid.Row className='commentsTitle'>
                        <h3>Comments</h3>
                    </Grid.Row>
                    <Grid.Row className='comments'>
                        <h4>Firts Comment</h4>
                    </Grid.Row>
                </Grid> */}
            </div>
        );
    }
}

class Redirection extends React.Component {

    state = {  }

    render() { 
        
        return (
            <div>
                {this.props.location.state? this.props.location.state.fromDashboard? <RestaurantPage state={this.props.location.state} /> : <Redirect to='/'/> : <Redirect to='/'/>}
            </div>
        );
    }
}
 
export default Redirection;