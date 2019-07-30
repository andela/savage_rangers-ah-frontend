import React, { Component } from 'react';
import axiosInstance from '../../../../configs/axios';
export class Home extends Component {
  state = {
    up: false,
    down: false
  }
  async componentDidMount() {
    const res = await axiosInstance.get('');
    if (res) this.setState({ up: true })
    else this.setState({ down: true })
  }
  render() {
    if (this.state.up) {
      return (
        <React.Fragment>
          <h1>Authors Heaven</h1>
          <p>This is the home page of authors heaven v 1.0.0</p>
        </React.Fragment>
      )
    } else if (this.state.down) {
      return (
        <React.Fragment>
          <h1>Sorry the server is down</h1>
        </React.Fragment>
      )
    } else {
      setTimeout(() => {
        this.setState({ down: true })
      }, 2000)
      return (
        <React.Fragment>
          <h1>Animation</h1>
        </React.Fragment>
      )

    }
  }
}

export default Home


