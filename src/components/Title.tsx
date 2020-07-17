import { Button, Grid, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import { useHistory } from 'react-router'

interface TitleProps {
  title: string
  subtitle: string
  withButton?: boolean
  buttonType?: 'add' | 'back'
  to?: string
}

const Title = ({ title, subtitle, withButton, buttonType, to }: TitleProps) => {
  const history = useHistory()
  return (
    <Grid container justify="space-between" alignItems="flex-end">
      <Grid item xs={6}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Grid>
      {withButton && (
        <Grid item xs={6}>
          <Grid container justify="flex-end">
            {/* Will be disabled when you have take all of your subjects */}
            {buttonType === 'add' ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => to && history.push(to)}
              >
                Añadir nueva asignatura
              </Button>
            ) : (
              <IconButton onClick={() => history.goBack()}>
                <CloseIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default Title
