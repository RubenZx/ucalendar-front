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
  buttonText?: string
  titleVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'srOnly'
  subTitleVariant?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | 'srOnly'
  buttonType?: 'add' | 'back'
  onClick?: () => void
}

const Title = ({
  title,
  titleVariant = 'h6',
  subTitleVariant = 'body1',
  subtitle,
  buttonText,
  withButton,
  buttonType,
  onClick,
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
        <Typography variant={titleVariant}>{title}</Typography>
        <Typography variant={subTitleVariant}>{subtitle}</Typography>
      </Box>
      {withButton && (
        <Box display="flex" justifyContent="flex-end">
          {/* Will be disabled when you have take all of your subjects */}
          {buttonType === 'add' ? (
            <Button variant="contained" color="primary" onClick={onClick}>
              {buttonText}
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
