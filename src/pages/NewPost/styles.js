import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #404349;
`;

export const Input = styled.TextInput`
  background-color: 'transparent';
  margin: 10px;
  color: #fff;
  size: 20px;
`;

export const Button = styled.TouchableOpacity`
  margin-right: 5px;
  padding: 5px 12px;
  background-color: #418cfd;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
