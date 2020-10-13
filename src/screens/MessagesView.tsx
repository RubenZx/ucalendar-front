import { Box, Divider, List, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { StyledPaper } from '../components/forms/new-timetable-item'
import Messages from '../components/messages'
import NoMessagesText from '../components/messages/NoMessagesText'
import SendMessageModal from '../components/messages/SendMessageModal'
import Title from '../components/Title'
import { useAuth } from '../context/auth'
import { useUser } from '../context/user'
import { getAll, getMessages } from '../services/api'
import { Message as MessageType } from '../services/types'
import { styled } from '../theme'

const StyledList = styled(List)`
  width: 100%;
  max-width: 300px;
  position: relative;
  overflow: auto;
  max-height: 65vh;
`

const MessagesView = () => {
  const { userToken } = useAuth()
  const { user } = useUser()
  const uid = user?.uid

  const [open, setOpen] = useState(false)
  const [users, setUsers] = useState<
    { name: string; lastName: string; uid: string }[]
  >([])
  const [messages, setMessages] = useState<Omit<MessageType, 'sentFrom'>[]>([])
  const [receptor, setReceptor] = useState('')

  const fetchMessages = (selectedId: string) => {
    setReceptor(selectedId)
    if (uid && userToken) {
      ;(async () => {
        const res = await getMessages(uid, selectedId, userToken)
        setMessages(res)
      })()
    }
  }

  useEffect(() => {
    ;(async () => {
      if (userToken && uid) {
        const res = await getAll('messages/users', userToken)
        setUsers(res)
      }
    })()
  }, [userToken, uid, messages])

  return (
    <>
      <Title
        title="Mensajes"
        subtitle="Aquí se puedes ver y enviar mensajes"
        withButton
        buttonType="add"
        buttonText="Nuevo mensaje"
        onClick={() => setOpen(true)}
      />
      <StyledPaper>
        <Box display="flex">
          {users.length > 0 && (
            <>
              <StyledList>
                {users.map((user, index) => {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => {
                        fetchMessages(user.uid)
                      }}
                    >
                      <ListItemText primary={`${user.name} ${user.lastName}`} />
                    </ListItem>
                  )
                })}
              </StyledList>
              <Box m={1} />
              <Divider orientation="vertical" flexItem />
              <Box m={1} />
            </>
          )}
          {messages.length < 1 ? (
            <NoMessagesText />
          ) : (
            <Messages
              messages={messages}
              handleAddMessage={(newMessages) => {
                setMessages(newMessages)
              }}
              reload={() => {
                fetchMessages(receptor)
              }}
              receptor={receptor}
            />
          )}
        </Box>
      </StyledPaper>
      <SendMessageModal
        open={open}
        handleOpen={(open: boolean) => setOpen(open)}
        onClose={(uid: string) => {
          fetchMessages(uid)
        }}
      />
    </>
  )
}

export default MessagesView
