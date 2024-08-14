import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
      <>
          <SidebarMenuItem
              to='/dashboard'
              icon='home'
              title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
              fontIcon='bi-app-indicator'
          />
          <SidebarMenuItem
              to='/apps/user-management/users'
              icon='people'
              title='Implementacion'
              fontIcon='bi-layers'
          />
          <SidebarMenuItem to='/apps/user-intermediario/main' icon='bank' title='Intermediarios' fontIcon='bi-layers'/>




      

      </>
  )
}

export {SidebarMenuMain}
