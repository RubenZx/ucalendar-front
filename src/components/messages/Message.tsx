import { Box, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import React from 'react'
import { useUser } from '../../context/user'
import { Message as MessageType } from '../../services/types'

interface MessageProps {
  message: Omit<MessageType, 'sentFrom'>
}

const Message = ({ message }: MessageProps) => {
  const { user } = useUser()
  const uid = user?.uid

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        alignSelf={message.sentFromUid === uid ? 'flex-end' : 'flex-start'}
        width="fit-content"
        maxWidth="60%"
        style={{
          border: 'solid 1px',
          borderColor: 'gray',
          borderRadius:
            message.sentFromUid === uid
              ? '14px 14px 0px 14px'
              : '14px 14px 14px 0px',
          padding: '6px 7px 8px 9px',
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography variant="caption">
          {format(new Date(message.sentDate), 'HH:MM - dd/MM/yy')}
        </Typography>
      </Box>
      <Box m={1} />
    </Box>
  )
}

export default Message
