import { Box, Typography } from '@material-ui/core'
import React from 'react'
import CardLink from '../components/CardLink'
import { StyledPaper } from '../components/forms/new-timetable-item'
import Title from '../components/Title'
import { useUser } from '../context/user'
import { adminLinks, userLinks } from '../utils/welcome-links'

const Base = () => {
  const { user } = useUser()
  const links = user && user.role === 'ADMINISTRATOR' ? adminLinks : userLinks

  return (
    <>
      <Title
        title="Bienvenido a Ucalendar"
        titleVariant="h4"
        subTitleVariant="subtitle1"
        subtitle="Con esta aplicación podrás gestinar y planificar tu horario semanal de acuerdo a tus asignaturas matriculadas"
      />
      <StyledPaper>
        <Box display="flex" flexDirection="column" width="100%">
          <Typography variant="subtitle1" style={{ paddingTop: '8px' }}>
            Para poder navegar puedes usar el menú lateral. A continuación
            aparecerán items con los que también podrás navegar:
          </Typography>
          <Box m={3} />
          <Box
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
            style={{ paddingBottom: '40px' }}
          >
            {links &&
              links.map((link, idk) => (
                <div key={idk} style={{ margin: '25px' }}>
                  <CardLink {...link} />
                </div>
              ))}
          </Box>
        </Box>
      </StyledPaper>
    </>
  )
}

export default Base
