import React, { Component } from 'react';
import { Alert } from 'reactstrap';

/*
 * Renders an error message in the form of a banner.
 * Intended to be used at the top of the page when an error occurs.
 */
export default class ErrorBanner extends Component {

  render() {
    return (
      <Alert color="danger">
        <b>
          { `Error (${ this.props.statusCode }): ` }
        </b>
        { this.props.message }
      </Alert>
    );
  }
}
