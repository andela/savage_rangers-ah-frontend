// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// import profileActions from '../../../Redux/Actions/Profile';

// export class Rating extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: 'jjj', user: '' };
//   }

//   componentDidMount() {
//     // this.props.getRating(this.props.slug);
//   }

//   componentWillReceiveProps(nextProps) {
//     console.log('================');

//     console.log(nextProps.rating);
//     if (nextProps.rating.allUsers) {
//       this.setState({ user: nextProps.rating.allUsers });
//     } else {
//       this.setState({ error: nextProps.rating });
//     }
//   }

//   render() {
//     return <div>{this.state.user || this.state.error}</div>;
//   }
// }

// export const mapStateToProps = state => ({ rating: state.profile.rating });

// export default connect(mapStateToProps)(Rating);
