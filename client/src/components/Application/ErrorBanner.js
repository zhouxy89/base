import React, { Component } from 'react';
import { Alert, Collapse } from 'reactstrap';

/*
 * Renders an error message in the form of a banner.
 * Intended to be used at the top of the page when an error occurs.
 */
export default class ErrorBanner extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Collapse isOpen={ this.props.showError }>
        <Alert color="danger">
          <b>
          { this.props.title }
          </b>
          { this.props.message }
        </Alert>
      </Collapse>
    );
  }
}
