import React, { useEffect, useState } from 'react'
import {
  Button,
  DialogContent,
  DialogContentText,
  Grid,
  TextField,
  makeStyles,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  codeContainer: {
    margin: '0.5em',
  },
  contentText: {
    marginBottom: 0,
  },
  textField: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
})

const mutation = gql`
  mutation($input: VerifyAuthLinkInput!) {
    verifyAuthLink(input: $input)
  }
`

interface VerifyCodeFieldsProps {
  authLinkID: string
  verifyCode: string
}

export default function VerifyCodeFields(
  props: VerifyCodeFieldsProps,
): JSX.Element {
  const classes = useStyles()

  const [verifyCode] = useMutation(mutation, {
    variables: {
      input: {
        id: props.authLinkID,
        code: props.verifyCode,
      },
    },
  })

  const renderTextField = (i: number) => (
    <Grid item xs={3}>
      <TextField
        value={props.verifyCode.charAt(i)}
        InputProps={{
          readOnly: true,
        }}
        inputProps={{
          className: classes.textField,
        }}
      />
    </Grid>
  )

  return (
    <DialogContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DialogContentText className={classes.contentText}>
            Please verify that the code displayed is the same on your mobile
            device.
          </DialogContentText>
        </Grid>
        <Grid
          className={classes.codeContainer}
          item
          xs={12}
          container
          spacing={2}
        >
          {renderTextField(0)}
          {renderTextField(1)}
          {renderTextField(2)}
          {renderTextField(3)}
        </Grid>
        <Grid className={classes.buttonContainer} item xs={12}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => verifyCode()}
          >
            Looks good
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  )
}