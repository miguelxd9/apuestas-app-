export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  balance: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  sportType: string;
  team1: string;
  team2: string;
  odds1: number;
  odds2: number;
  oddsDraw?: number;
  status: string;
  startTime: string;
  endTime?: string;
  winner?: string;
  totalBets: number;
}

export interface Bet {
  id: string;
  amount: number;
  odds: number;
  potentialWinnings: number;
  betType: string;
  status: string;
  selectedTeam: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    team1: string;
    team2: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CreateBetForm {
  eventId: string;
  betType: string;
  amount: number;
}
