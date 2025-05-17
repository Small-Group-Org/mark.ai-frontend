import {
  DashboardIcon,
  CreateIcon,
  CalendarIcon,
  MindIcon,
} from "../components/dashboard/IconComponents";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    path: "/create",
    label: "Create",
    icon: CreateIcon,
  },
  {
    path: "/calendar",
    label: "Calendar",
    icon: CalendarIcon,
  },
  {
    path: "/mind",
    label: "Mind",
    icon: MindIcon,
  },
];
