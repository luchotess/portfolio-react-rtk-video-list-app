import { useContext } from 'react'

import { Avatar, Button, Group, Header, Text } from '@mantine/core'

import { AuthContext } from '../Auth/AuthProvider.tsx'

export default function LayoutHeader() {
  const authContext = useContext(AuthContext)
  const { user, logout } = authContext

  return (
    <Header height={70} p="md">
      <Group position="apart">
        <Text size="lg" weight="bolder">
          Video Listing App
        </Text>

        {user?.email && (
          <Group>
            <Avatar radius="xl" />
            <Text>{user?.email}</Text>
            <Button variant="light" color="red" onClick={logout}>
              Log out
            </Button>
          </Group>
        )}
      </Group>
    </Header>
  )
}
