import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface CardLinkProps {
  title: string
  subTitle: string
  icon: string
  to: string
}

const CardLink = ({ title, subTitle, icon, to }: CardLinkProps) => {
  const history = useHistory()

  return (
    <Card style={{ width: '360px' }} elevation={6}>
      <CardActionArea onClick={() => history.push(to)}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Box m={1} />
            <img src={icon} alt="" height="50px" />
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardLink
