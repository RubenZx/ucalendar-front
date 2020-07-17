import { Box, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { Data, Subject as SubjectType } from '../types/table'
import Subject from './subject'

interface TableProps {
  tableData: Data
}

const Table = ({ tableData }: TableProps) => {
  return (
    <Paper style={{ padding: '10px' }} elevation={2}>
      <Box display="flex">
        {Object.entries(tableData).map(
          ([day, subjects]: [string, SubjectType[]]) => {
            return (
              <Box key={day} flexGrow={1} minWidth="220px">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h6">{day}</Typography>
                  {subjects.map((subject, key) => (
                    <Subject key={key} subject={subject} />
                  ))}
                </Box>
              </Box>
            )
          },
        )}
      </Box>
    </Paper>
  )
}

export default Table
