import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {Container, AreaInput, Input, List} from './styles';
import Feather from 'react-native-vector-icons/Feather';

import SearchList from '../../components/SearchList';

function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === '' || input === undefined) {
      setUsers([]);
      return;
    }

    const subscriber = firestore()
      .collection('users')
      .where('nome', '>=', input)
      .where('nome', '<=', input + '\uf8ff')
      .onSnapshot(snapshot => {
        const listUser = [];

        snapshot.forEach(doc => {
          listUser.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        //console.log('LISTA DE USERS');
        //console.log(listUser);

        setUsers(listUser);
      });

    return () => subscriber();
  }, [input]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#E52246" />
        <Input
          placeholder="Está procurando alguém?"
          value={input}
          onChangeText={text => {
            setInput(text);
          }}
        />
      </AreaInput>
      <List data={users} renderItem={({item}) => <SearchList data={item} />} />
    </Container>
  );
}

export default Search;
