import { useNavigate } from 'react-router-dom';

import CustomInput from '../../shared/components/FormElements/CustomInput';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import { CustomUseForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL } from '../../shared/util/validators';

import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = CustomUseForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false,
  );
  const forgotPWSubmitHandler = (event) => {
    event.preventDefault();
    navigate('/auth/reset-password');
  };

  return (
    <div className='forgotPW'>
      <h2 className='forgotPW--greeting'>Forgot Password</h2>
      <br />
      <p className='forgotPW--instruction'>
        Have you forgotten your password to log in to GamerLibrae? Just fill in the email address
        you registered with in the form below and we will send you an email to reset your password.
        For details, please follow the instructions in the email.
      </p>
      <form className='forgotPW--form' onSubmit={forgotPWSubmitHandler}>
        <CustomInput
          element='input'
          id='email'
          type='email'
          label='Email'
          placeholder='Enter your email address'
          validators={[VALIDATOR_EMAIL()]}
          sideButton='Back to log in'
          sideButtonLink='/auth'
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <div className='forgotPW--form--submit'>
          <CustomButton type='submit' disabled={!formState.isValid}>
            SUBMIT
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;