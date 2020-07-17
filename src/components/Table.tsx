import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { styled } from '../theme'
import { Data, Subject as SubjectType } from '../types/table'
import Subject from './subject'

const StyledPaper = styled(Paper)`
  padding: 10px;
`

const StyledBox = styled(Box)`
  margin: 0px 20px;
`

interface TableProps {
  tableData: Data
}

const Table = ({ tableData }: TableProps) => {
  return (
    <StyledPaper elevation={2}>
      <Box display="flex">
        {Object.entries(tableData).map(
          ([day, subjects]: [string, SubjectType[]]) => (
            <StyledBox
              key={day}
              width="100%"
              display="flex"
              flexGrow={1}
              justifyContent="flex-start"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h6">{day}</Typography>
              {subjects.map((subject, key) => (
                <Subject key={key} subject={subject} />
              ))}
            </StyledBox>
          ),
        )}
      </Box>
    </StyledPaper>
  )
}

export default Table
