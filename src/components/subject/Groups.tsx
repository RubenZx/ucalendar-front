import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Group } from './types'

const Groups = ({ groups, type }: { groups: Group[]; type: string }) => (
  <Grid container justify="center">
    {groups.map(({ group, weeks }, index) => (
      <Grid item key={index} style={{ marginBottom: '8px' }}>
        <Grid container justify="center">
          <Grid item xs={12} style={{ paddingBottom: '5px' }}>
            <Typography>
              {group} - Clases de {type}
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <Grid
              container
              justify="space-between"
              style={{ padding: '0px 8px 8px' }}
            >
              {weeks.map((week, idk) => (
                <Grid item key={idk}>
                  <Typography
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: week ? 'bold' : 'normal',
                      opacity: week ? '1' : '0.5',
                    }}
                  >
                    {idk + 1}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ))}
  </Grid>
)

export default Groups
