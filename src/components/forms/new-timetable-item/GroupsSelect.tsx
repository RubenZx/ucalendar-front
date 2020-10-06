import {
  Box,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import { Field, FormikErrors } from 'formik'
import {
  Autocomplete,
  AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import { getAll } from '../../../services/api'
import { Generic } from '../../../services/types'
import { Error } from './DegreeSelect'
import NewGroupModal from './NewGroupModal'

const GroupsSelect = ({
  error,
  disabled,
}: {
  error: string | undefined | FormikErrors<Generic>
  disabled: boolean
}) => {
  const [groups, setGroups] = useState<Generic[]>([])
  const [open, setOpen] = useState(false)

  const { userToken } = useAuth()

  useEffect(() => {
    if (userToken) {
      ;(async () => {
        const groups = await getAll('groups/', userToken)
        setGroups(groups)
      })()
    }
  }, [userToken])

  return (
    <Box display="flex" flexGrow={1} flexDirection="column">
      <InputLabel style={{ marginBottom: '5px' }}>Elija un grupo</InputLabel>
      <Box display="flex" flexGrow={1} alignItems="center">
        {groups ? (
          <Field
            name="group"
            component={Autocomplete}
            options={groups}
            fullWidth
            noOptionsText="El grupo introducido no existe"
            getOptionLabel={(option: Generic) =>
              option.name ? option.name : ''
            }
            getOptionSelected={(option: Generic, value: any) =>
              option.id === value.id
            }
            renderInput={(props: AutocompleteRenderInputParams) => (
              <TextField {...props} error={error !== undefined} />
            )}
          />
        ) : (
          <TextField error={error !== undefined} disabled />
        )}
        <Tooltip title="Crear nuevo grupo" arrow>
          <IconButton
            disabled={disabled}
            color="secondary"
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Error variant="caption" color="error">
        {error}
      </Error>
      <NewGroupModal
        open={open}
        setOpen={(opt) => setOpen(opt)}
        setGroups={setGroups}
        groups={groups}
      />
    </Box>
  )
}

export default GroupsSelect
