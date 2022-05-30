import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 14px;
  flex: 1;
  background-color: #353440;
`;

export const AreaInput = styled.View`
  background-color: #f1f1f1;
  width: 90%;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 5px 10px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 40px;
  font-size: 20px;
  background-color: #f1f1f1;
  color: #353440;
  padding-left: 10px;
`;

export const List = styled.FlatList`
  flex: 1;
`;
