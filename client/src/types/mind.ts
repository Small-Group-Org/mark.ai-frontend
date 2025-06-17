export interface InfoCardProps {
  title: string;
  icon: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
  className?: string;
}

export interface InfoRowProps {
  label: string;
  value: any;
  isNew?: boolean;
} 