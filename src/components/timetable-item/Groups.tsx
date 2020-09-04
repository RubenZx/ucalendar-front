import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { styled } from '../../theme'

const StyledTypography = styled(Typography)<{ week: string }>`
  font-size: 0.75rem;
  font-weight: ${({ week }) => (week === 'true' ? 'bold' : 'normal')};
  opacity: ${({ week }) => (week === 'true' ? 1 : 0.5)};
`

const Groups = ({
  group,
  type,
  weeks,
}: {
  group: string
  type: string
  weeks: boolean[]
}) => {
  return (
    <Box
      style={{ marginBottom: '8px' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography>
        {group} - {type}
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        style={{ padding: '0px 8px 8px' }}
      >
        {weeks.map((week, idk) => (
          <StyledTypography week={week.toString()} key={idk}>
            {idk + 1}
          </StyledTypography>
        ))}
      </Box>
    </Box>
  )
}

export default Groups
