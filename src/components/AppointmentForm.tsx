import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Button, Input, Text, Divider } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';
import theme from '../styles/theme';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface AppointmentFormProps {
  doctors: Doctor[];
  onSubmit: (appointment: {
    doctorId: string;
    date: Date;
    notes: string;
  }) => void;
  initialValues?: {
    doctorId: string;
    date: Date;
    notes: string;
  };
  isLoading?: boolean;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  doctors,
  onSubmit,
  initialValues,
  isLoading = false,
}) => {
  const [doctorId, setDoctorId] = useState(initialValues?.doctorId || '');
  const [date, setDate] = useState(initialValues?.date || new Date());
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!doctorId) {
      newErrors.doctorId = 'Por favor, selecione um médico';
    }
    
    // Check if date is in the future
    if (date < new Date()) {
      newErrors.date = 'A data da consulta deve ser no futuro';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        doctorId,
        date,
        notes,
      });
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = new Date(date);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDate(newDate);
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView style={styles.container}>
      <FormTitle>Agendar Consulta</FormTitle>
      
      <FormSection>
        <FormLabel>Médico</FormLabel>
        <PickerContainer>
          <Picker
            selectedValue={doctorId}
            onValueChange={(itemValue) => setDoctorId(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um médico" value="" />
            {doctors.map((doctor) => (
              <Picker.Item 
                key={doctor.id} 
                label={`${doctor.name} - ${doctor.specialty}`} 
                value={doctor.id} 
              />
            ))}
          </Picker>
        </PickerContainer>
        {errors.doctorId && <ErrorText>{errors.doctorId}</ErrorText>}
      </FormSection>

      <FormSection>
        <FormLabel>Data e Hora</FormLabel>
        <DateTimeContainer>
          <DateTimeButton onPress={() => setShowDatePicker(true)}>
            <DateTimeButtonText>{formatDate(date)}</DateTimeButtonText>
          </DateTimeButton>
          
          <DateTimeButton onPress={() => setShowTimePicker(true)}>
            <DateTimeButtonText>{formatTime(date)}</DateTimeButtonText>
          </DateTimeButton>
        </DateTimeContainer>
        {errors.date && <ErrorText>{errors.date}</ErrorText>}
        
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}
        
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
            minuteInterval={15}
          />
        )}
      </FormSection>

      <FormSection>
        <FormLabel>Observações</FormLabel>
        <Input
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
          placeholder="Descreva o motivo da consulta ou adicione informações relevantes"
          containerStyle={styles.notesInput}
        />
      </FormSection>

      <Button
        title="Agendar Consulta"
        onPress={handleSubmit}
        loading={isLoading}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitButtonText}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  picker: {
    width: '100%',
    height: 50,
  },
  notesInput: {
    paddingHorizontal: 0,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const FormTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 24px;
  text-align: center;
`;

const FormSection = styled.View`
  margin-bottom: 20px;
`;

const FormLabel = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const PickerContainer = styled.View`
  border-width: 1px;
  border-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 4px;
`;

const DateTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateTimeButton = styled.TouchableOpacity`
  flex: 0.48;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #e0e0e0;
`;

const DateTimeButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;

export default AppointmentForm;