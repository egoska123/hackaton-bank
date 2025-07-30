export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'CHILD' | 'PARENT';
  balance: number; // в копейках
  childId: string;
  parent: {
    id: string;
    email: string;
    profile: {
      fullName: string;
    };
  };
}

export interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
} 