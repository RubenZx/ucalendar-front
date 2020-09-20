import { Box, Button, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { styled } from '../theme'

const StyledBox = styled(Box)`
  margin-bottom: 25px;
`

interface TitleProps {
  title: string
  subtitle: string
  withButton?: boolean
  buttonType?: 'add' | 'back'
  to?: string
  state?: any
}

const Title = ({
  title,
  subtitle,
  withButton,
  buttonType,
  to,
  state,
}: TitleProps) => {
  const history = useHistory()

  return (
    <StyledBox
      display="flex"
      justifyContent="space-between"
      alignItems="flex-end"
      width="100%"
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Box>
      {withButton && to && (
        <Box display="flex" justifyContent="flex-end">
          {/* Will be disabled when you have take all of your subjects */}
          {buttonType === 'add' ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push(to, state)}
            >
              Añadir nueva asignatura
            </Button>
          ) : (
            <IconButton onClick={() => history.goBack()}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
    </StyledBox>
  )
}

export default Title
