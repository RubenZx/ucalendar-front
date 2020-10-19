import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  List,
  Tooltip,
} from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached'
import SendIcon from '@material-ui/icons/Send'
import React, { useState } from 'react'
import { useAuth } from '../../context/auth'
import { useUser } from '../../context/user'
import { sendMessage } from '../../services/api'
import { Message as MessageType } from '../../services/types'
import { styled } from '../../theme'
import Message from './Message'

interface MessagesProps {
  receptor: string
  messages: Omit<MessageType, 'sentFrom'>[]
  handleAddMessage: (newMessages: MessageType[]) => void
  reload: () => void
}

const StyledMessagesList = styled(List)`
  max-height: 65vh;
  max-width: 100%;
  padding: 14px;
  height: inherit;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
`

const Messages = ({
  messages,
  receptor,
  handleAddMessage,
  reload,
}: MessagesProps) => {
  const { userToken } = useAuth()
  const { user } = useUser()
  const uid = user?.uid

  const [newMessage, setNewMessage] = useState('')

  const sendNewMessage = () => {
    if (userToken && uid && receptor) {
      ;(async () => {
        const messageSent = await sendMessage(
          { sentToUid: receptor, sentFromUid: uid, content: newMessage },
          userToken,
        )
        handleAddMessage([messageSent, ...messages])
        setNewMessage('')
      })()
    }
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="65vh"
      padding="8px 16px"
    >
      <StyledMessagesList>
        {messages.map((message, idk) => (
          <Message message={message} key={idk} />
        ))}
      </StyledMessagesList>
      <Box display="flex">
        <Input
          fullWidth
          value={newMessage}
          multiline
          placeholder="Nuevo mensaje..."
          rowsMax={2}
          onChange={(event) => {
            const text = event.target.value
            if (text.length < 190) setNewMessage(event.target.value)
          }}
          style={{ paddingTop: '10px' }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={newMessage.length < 10 || newMessage.length > 190}
                onClick={() => {
                  sendNewMessage()
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <Box m={1} />
        <Tooltip title="Actualizar">
          <IconButton onClick={reload}>
            <CachedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Messages
