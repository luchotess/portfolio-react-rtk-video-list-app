import { Footer, Group, Text } from '@mantine/core'

export default function LayoutFooter() {
  return (
    <Footer height={60} p="md">
      <Group position="apart" spacing="xl">
        <Text size="sm">
          <span style={{ fontWeight: 'bolder' }}>Build by: </span>Luis Suarez
        </Text>
        <Text size="sm">
          <span style={{ fontWeight: 'bolder' }}>Technologies used: </span>React, Redux, RTK,
          Mantine
        </Text>
      </Group>
    </Footer>
  )
}
