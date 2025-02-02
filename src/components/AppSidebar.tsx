import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Home, UserRoundCog } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const AppSidebar = () => {
  const t = useTranslations('AppSidebar');

  // Menu items.
  const items = [
    {
      title: t('home'),
      url: '/',
      icon: Home,
    },
    {
      title: t('dashboard'),
      url: '/dashboard',
      icon: UserRoundCog,
    },
  ];

  // if (isMobile) {
  //   return (

  //   )
  // }

  return (
    <Sidebar title={t('title')}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('title')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
