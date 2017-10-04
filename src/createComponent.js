import { observe, observable } from 'mobx'
import React, { Component } from 'react';

function createComponent(getInitialState, getTemplate) {
  class Generic extends Component {
    state = { __UNINITIALIZED: false };

    componentDidMount() {
      getInitialState(this.props)
        .then(data => {
          const model = observable(data);

          this.setState({
            model,
            __INITIALIZED: true
          });

          observe(this.state.model, ({ object }) => {
            this.setState({ model: object });
          });
        });
    }

    render() {
      if (!this.state.__INITIALIZED) {
        return null;
      }

      return getTemplate(this.state.model);
    }
  }

  return (props) => <Generic {...props} />;
}

export default createComponent;
