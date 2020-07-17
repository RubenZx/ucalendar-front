import { Grid } from '@material-ui/core'
import React from 'react'
import { styled } from '../../theme'
import MyDrawer from './drawer'

const Container = styled(Grid)`
  flex-grow: 1;
  margin-top: 90px;
  padding: 10px 30px;
`

const Root = styled.div`
  display: flex;
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Root>
      <MyDrawer />
      <Container container>{children}</Container>
    </Root>
  )
}

export default Layout
