import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
interface newItemProps {
  img: string
  title: ReactNode
  body: string
  to: string
}

const NewItemCard = ({ img, title, body, to }: newItemProps) => {
  const history = useHistory()

  return (
    <Card style={{ maxWidth: '345px' }}>
      <CardActionArea onClick={() => history.push(to)}>
        <CardMedia image={img} style={{ height: '140px' }} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default NewItemCard
