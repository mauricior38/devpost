import React from 'react';
import {View, Text} from 'react-native';

import {Container, Title} from './styles';

function Header() {
  return (
    <Container>
      <Title>
        DEV
        <Text style={{fontStyle: 'italic', color: '#E52246'}}>POST</Text>
      </Title>
    </Container>
  );
}

export default Header;
