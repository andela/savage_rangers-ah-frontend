import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import testReduxAction from '../../Redux/Actions/testReduxActions';

const { getWelcome } = testReduxAction;
/**
 *
 *This class is just for showing how we will use Redux,
 * Once the home page will be done, will no longer be needed
 * @export
 * @class TestRedux
 * @extends {Component}
 */
export class TestRedux extends Component {
  componentDidMount() {
    this.props.getWelcome();
  }

  render() {
    return (
      <div>
        <p>
          message loaded from redux:
          {this.props.data ? this.props.data.message : ''}
        </p>
      </div>
    );
  }
}

TestRedux.propTypes = { getWelcome: propTypes.func.isRequired };

// get data from redux and put it in props
export const mapStateToProps = state => ({ data: state.testRedux.data });

// export the component while connecting to redux
export default connect(mapStateToProps,
  { getWelcome })(TestRedux);
