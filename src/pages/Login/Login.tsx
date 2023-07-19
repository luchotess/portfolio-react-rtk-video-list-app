import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { Box, Button, Flex, Group, Paper, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'

import { AuthContext } from '../../core/Auth/AuthProvider.tsx'

const initialValues = {
  email: '',
  password: '',
}

export default function Login() {
  const authContext = useContext(AuthContext)
  const { user, login } = authContext

  const form = useForm({
    initialValues,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) =>
        value.length < 3 ? 'Password should contain 3 or more characters' : null,
    },
  })

  const onFormSubmit = ({ email }: typeof initialValues) => {
    login({ email })

    notifications.show({
      title: 'Success',
      message: `User ${email} is now logged in`,
    })
  }

  return (
    <>
      {user?.email ? (
        <Navigate to="/home" />
      ) : (
        <Flex style={{ width: '100%', height: '100%' }} align="center">
          <Box style={{ width: 300, margin: '0 auto' }}>
            <Paper>
              <Text align="center" weight={700} size="xl">
                Login
              </Text>
              <form onSubmit={form.onSubmit(onFormSubmit)}>
                <TextInput label="Email" {...form.getInputProps('email')} required />
                <TextInput
                  label="Password"
                  type="password"
                  {...form.getInputProps('password')}
                  required
                />
                <Group position="right" mt="md">
                  <Button type="submit">Submit</Button>
                </Group>
              </form>
            </Paper>
          </Box>
        </Flex>
      )}
    </>
  )
}
