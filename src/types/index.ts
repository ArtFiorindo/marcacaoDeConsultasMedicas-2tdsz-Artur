
export type Appointment = {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  description: string;
  status: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  image: string;
};

export type RootStackParamList = {
  Home: undefined;
  CreateAppointment: undefined;
  Profile: undefined;
}; 