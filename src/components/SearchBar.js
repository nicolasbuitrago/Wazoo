import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'

import './SearchBar.css';

const source = [
  {
    "title": "Pacocha - Connelly",
    "description": "Distributed motivating alliance",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/jeremery/128.jpg",
    "price": "$47.87"
  },
  {
    "title": "Hilpert - Lakin",
    "description": "Open-source homogeneous concept",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/kiwiupover/128.jpg",
    "price": "$52.48"
  },
  {
    "title": "O'Hara Group",
    "description": "Virtual 3rd generation adapter",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/ryanmclaughlin/128.jpg",
    "price": "$87.82"
  },
  {
    "title": "Schaefer, Torp and Mosciski",
    "description": "Expanded reciprocal emulation",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/alan_zhang_/128.jpg",
    "price": "$98.56"
  },
  {
    "title": "Kshlerin, Predovic and White",
    "description": "Fully-configurable radical firmware",
    "image": "https://s3.amazonaws.com/uifaces/faces/twitter/teylorfeliz/128.jpg",
    "price": "$31.33"
  }
];

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}