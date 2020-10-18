import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, LinearProgress, Snackbar, TextField, Typography } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { sendEmail } from '../../utils/apiUtils';

const schema = yup.object().shape({
  firstname: yup.string().required('You need to provide a firstname.').min(2, 'Your firstname need to be atleast 2 characters.'),
  lastname: yup.string().required('You need to provide a lastname.').min(2, 'Your lastname need to be atleast 2 characters.'),
  email: yup.string().email('You need to provide a valid email.').required('You need to provide an email.'),
  message: yup.string().required('You need to provide a message.').min(10, 'Your message need to be atleast 10 characters.'),
});

export default function Contact() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const [sendError, setSendError] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  function closeError() {
    setSendError(false);
  }
  function closeSuccess() {
    setSendSuccess(false);
  }

  const [sendEmailMutation, sendEmailMutationStatus] = useMutation(sendEmail, {
    onError: () => {
      setSendError(true);
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        setSendSuccess(true);
      } else {
        setSendError(true);
      }
    }
  });

  function submitMessage(value) {
    const body = {
      name: `${value.firstname} ${value.lastname}`,
      email: value.email,
      message: value.message,
      token: 'notoken', // The endpoint are setup to support a call with recaptcha token, since this doesn't use recaptcha i need to provide a dummy string.
    }
    sendEmailMutation(body);
  }

  return (
    <Container>
      <Typography variant='h2' align='center' component='h2'>Contact</Typography>
      {sendEmailMutationStatus.isLoading && <LinearProgress variant='query' />}
      <form onSubmit={handleSubmit(submitMessage)} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: '0 auto' }}>
        <TextField
          name='firstname'
          inputRef={register}
          label='Firstname'
          error={errors.firstname !== undefined}
          helperText={errors.firstname ? errors.firstname.message : ''}
          margin='normal'
          />
        <TextField
          name='lastname'
          inputRef={register}
          label='Lastname'
          error={errors.lastname !== undefined}
          helperText={errors.lastname ? errors.lastname.message : ''}
          margin='normal'
          />
        <TextField
          name='email'
          inputRef={register}
          label='Email'
          error={errors.email !== undefined}
          helperText={errors.email ? errors.email.message : ''}
          margin='normal'
          />
        <TextField
          name='message'
          inputRef={register}
          label='Message'
          error={errors.message !== undefined}
          helperText={errors.message ? errors.message.message : ''}
          margin='normal'
          multiline
          rows={5}
          />
        <Button type='submit' endIcon={<MailOutlineIcon />}>Send</Button>
      </form>
      {/*NOTE: Snackbar triggers a findDOMNode warning i development,
        this is a known issue and will be fixed in V5 of material-ui.*/}
      <Snackbar open={sendError} autoHideDuration={5000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">Something went wrong sending your message.</Alert>
      </Snackbar>
      <Snackbar open={sendSuccess} autoHideDuration={5000} onClose={closeSuccess}>
        <Alert onClose={closeSuccess} severity="success">Your message has been sent.</Alert>
      </Snackbar>
    </Container>
  )
}
