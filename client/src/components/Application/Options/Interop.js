import React, {Component} from 'react'
import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap'
import { Button, Input } from 'reactstrap'

export default class Interop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_text: ''
    }
  }

  updateInput(e) {
    this.setState({input_text: e.target.value})
  }

  render() {
    return (
        <Card className='text-center'>
          <CardHeader>Server</CardHeader>
          <CardBody>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.updateOption('hostname', this.state.input_text);
            }}>

              <Input onChange={this.updateInput.bind(this)}
                     value={this.state.input_text}
                     placeholder={this.props.hostname}/>
              <br/>
              <Button type='submit' className='btn-dark w-100'>Configure</Button>

            </form>
          </CardBody>
        </Card>
    );
  }
}
