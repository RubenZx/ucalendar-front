import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Filter1Icon from '@material-ui/icons/Filter1'
import Filter2Icon from '@material-ui/icons/Filter2'
import React from 'react'
import { useHistory } from 'react-router-dom'
import routes from '../../../routes/routes'
import { styled } from '../../../theme'

export const StyledListItem = styled(ListItem)`
  padding-left: ${({ theme }) => theme.spacing(4)}px;
`

const HorarioElements = [
  {
    text: '1er semestre',
    icon: <Filter1Icon />,
    path: routes.firstSemester.path,
  },
  {
    text: '2do semestre',
    icon: <Filter2Icon />,
    path: routes.secondSemester.path,
  },
]

const UserSections = () => {
  const history = useHistory()

  return (
    <>
      {HorarioElements.map(({ text, icon, path }, idk) => (
        <StyledListItem
          button
          key={text}
          onClick={() => {
            history.push(path)
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </StyledListItem>
      ))}
    </>
  )
}

export default UserSections
