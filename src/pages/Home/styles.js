import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #36393f;
`;

export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 60px;
  height: 60px;
  background-color: #202225;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const ListPosts = styled.FlatList`
  flex: 1;
  background-color: #f1f1f1;
`;
