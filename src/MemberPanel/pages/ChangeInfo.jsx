import { useState } from 'react';

import CustomInput from '../../shared/components/FormElements/CustomInput';
import CustomButton from '../../shared/components/FormElements/CustomButton';
import { CustomUseForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE, VALIDATOR_YOUTUBETWITCH } from '../../shared/util/validators';

const ChangeInfo = () => {
  const [successSubmission, setSuccessSubmission] = useState('');
  const [formState, inputHandler, setFormData] = CustomUseForm(
    {
      userName: {
        value: '',
        isValid: false,
      },
      url: {
        value: '',
        isValid: false,
      },
    },
    false,
  );
  const changeInfoSubmitHandler = (event) => {
    event.preventDefault();
    setSuccessSubmission('You have successfully changed your info!');
  };

  return (
    <div className='flex flex-col items-center rounded-lg bg-gray-700 p-4 pb-4'>
      <h2 className='text-3xl'>Change Info</h2>
      <form className='flex flex-col items-center' onSubmit={changeInfoSubmitHandler}>
        <CustomInput
          element='input'
          id='userName'
          type='text'
          label='Username'
          placeholder='Enter your new username'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='You must enter your username'
          onInput={inputHandler}
        />
        <CustomInput
          element='input'
          id='url'
          type='text'
          label='Youtube/Twitch URL'
          placeholder='Enter your Youtube/Twitch URL'
          validators={[VALIDATOR_YOUTUBETWITCH()]}
          errorText='Please enter a valid Youtube/Twitch URL.'
          onInput={inputHandler}
        />
        <p className='py-3'>{successSubmission}</p>
        <div>
          <CustomButton type='submit' disabled={!formState.isValid}>
            SUBMIT
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ChangeInfo;
