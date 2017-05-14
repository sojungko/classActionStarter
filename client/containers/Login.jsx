import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Loading from 'react-loading';
import store from '../index';
import { connect } from 'react-redux';
import SignUp from './SignUp';

import { postLogin } from '../actions/index';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }
  paperStyle = {
    height: 600,
    width: 600,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
  }
  onSubmit = (inputs) => {
    this.props.postLogin(inputs)
      .then((data) => {
        console.log(this.props.user);
        window.localStorage.setItem('token', this.props.user.user.token);
        window.localStorage.setItem('userID', this.props.user.user.user.id[0]);
        this.props.history.push('/dashboard');
      });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  );

  /* -- Functional component to render spinner -- */
  renderSpinner = () => {
    if (this.props.fetching) {
      return (
        <div className='spinner'>
          <Loading type='bubbles' color='#e3e3e3' />
        </div>
      );
    }
  }
  render () {
    const { handleSubmit, pristine, submitting, touch, field, errors } = this.props;
    return (
      <div className='children'>
        <Paper style={this.paperStyle} zDepth={5}>
          <div className='children'>
            <h1 className='header'>Start A Class Action Suit</h1>
            <form onSubmit={handleSubmit(this.onSubmit)} className='form'>
              <div className='fields'>
                <div className='field-line'>
                  <Field name='email' type='email' component={this.renderTextField} label='Email' />
                </div>
                <div className='field-line'>
                  <Field name='password' type='password' component={this.renderTextField} label='Password' />
                </div>
              </div>
              <div className='button-line'>
                <RaisedButton
                  label='Sign Up'
                  className='button'
                  onClick={this.handleOpen}
                />
                <RaisedButton
                  type='submit'
                  label='Submit'
                  disabled={pristine || submitting}
                  className='button'
                />
                {this.renderSpinner()}
              </div>
            </form >
            <RaisedButton
              label='Facebook'
              href='/auth/facebook'
              className='button'
            />
          </div >
        </Paper>
        <SignUp open={this.state.open} close={this.handleClose} />

      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

const validate = (values) => {
  const errors = {};
  const requiredFields = ['title', 'category', 'description'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

Login = reduxForm({
  form: 'Form',
  validate
})(Login);

export default connect(mapStateToProps, { postLogin })(Login);
