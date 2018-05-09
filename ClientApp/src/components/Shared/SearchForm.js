import React, { Component } from 'react';
import { connect } from 'react-redux';
// Total antd module size is 324K gzipped, so we must selectively import
import Card from 'antd/lib/card/';
import Form from 'antd/lib/form/';
import Button from 'antd/lib/button/';
import Input from 'antd/lib/input/';
import Icon from 'antd/lib/icon/';

const FormItem = Form.Item;

class SearchForm extends Component {
  state = {
    search: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.handleFormSubmit();
  };

  render() {
    return (
      <Card bordered={false}>
        <Form layout="inline" onSubmit={this.handleFormSubmit}>
          <FormItem wrapperCol={{ span: 24 }}>
            <Input
              type="text"
              size="large"
              placeholder={this.props.placeholderText}
              value={this.state.search}
              onChange={e => {
                this.setState({ search: e.target.value });
                if (this.props.handleTextChanged) {
                  this.props.handleTextChanged();
                }
              }}
            />
            <Button type="primary" onClick={e => this.handleFormSubmit(e)}>
              <Icon type="search" />
              {this.props.buttonText}
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

SearchForm.defaultProps = {
  placeholderText: 'ใส่คำค้นหา...',
  buttonText: 'ค้นหา',
};

function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(SearchForm);
