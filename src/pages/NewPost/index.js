import React, {useState, useLayoutEffect, useContext} from 'react';

import {useNavigation} from '@react-navigation/native';
import {Container, Input, Button, ButtonText} from './styles';

import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../contexts/auth';

import storage from '@react-native-firebase/storage';

function NewPost() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [post, setPost] = useState('');

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Comparttilhar</ButtonText>
        </Button>
      ),
    });
  }, [navigation, post]);

  async function handlePost() {
    if (post === '') {
      alert('Por favor, digite um post');
      console.log('O post contem conteúdo invalido');
      return;
    }

    let avatarUrl = null;

    try {
      let response = await storage()
        .ref('users')
        .child(user?.uid)
        .getDownloadURL();

      avatarUrl = response;
    } catch (err) {
      avatarUrl = null;
    }

    await firestore()
      .collection('posts')
      .add({
        created: new Date(),
        content: post,
        autor: user?.nome,
        userId: user?.uid,
        likes: 0,
        avatarUrl,
      })
      .then(() => {
        setPost('');
        console.log('post criado com sucesos');
      })
      .catch(error => {
        console.log('Erro ao criar o post', error);
      });

    navigation.goBack();
  }

  return (
    <Container>
      <Input
        placeholder="O que está acontecendo?"
        value={post}
        onChangeText={text => setPost(text)}
        autoCorrect={false}
        multiline={true}
        placeholderTextColor="#DDD"
        maxLength={300}
      />
    </Container>
  );
}

export default NewPost;
