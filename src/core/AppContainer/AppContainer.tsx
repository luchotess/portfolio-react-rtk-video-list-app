import { ReactNode } from 'react'

import { AppShell, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import LayoutFooter from '../layout/Footer.tsx'
import LayoutHeader from '../layout/Header.tsx'

interface Props {
  children: ReactNode
}

export const ApplicationContainer: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      styles={{
        main: {
          background: '#FFFFFF',
          width: '100vw',
          height: '100vh',
          paddingLeft: '0px',
        },
      }}
      fixed
      header={<LayoutFooter />}
      footer={<LayoutHeader />}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />

        {children}
      </MantineProvider>
    </AppShell>
  )
}
