import { RouterLink } from '../interfaces';
import { AppRouteEnum } from '../enums';

export const RouterLinks: Array<RouterLink> = [
  {
    name: AppRouteEnum.Users,
    path: `/${AppRouteEnum.Users}`,
    icon: '',
    activeClass: 'active',
  },
  {
    name: AppRouteEnum.Clinics,
    path: `/${AppRouteEnum.Clinics}`,
    icon: '',
    activeClass: 'active',
  },
  {
    name: AppRouteEnum.Admin,
    path: `/${AppRouteEnum.Admin}`,
    icon: '',
    activeClass: 'active',
  },
];
