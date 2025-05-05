export interface HomeToolBarProps {
  avatar: string;
  name: string;
  handleBellPress: () => void | undefined;
}

export interface MrHomeToolBarProps {
  data?: any;
  profileImage?: string;
  name: string;
  address: string;
  handleNotificationIcon?: () => void | undefined;
}

export interface MrHomeSearchBarProps {
  value?: string;
  onChangeText: (text: string) => void;
}

interface AppointmentItem {
    id: string | number;
    title: string;
    value: string | number;
    onPress: () => void;
  }
  
  export interface MrHomeAppointmentContainerProps {
    data: AppointmentItem[];
  }

  export interface MrNearByListProps {
    refreshing: boolean;
    onRefresh?: () => void | undefined;
    data?: any;
  }