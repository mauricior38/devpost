import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatDistance} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';

import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Name,
  Header,
  Avatar,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost,
} from './styles';

function PostLists({data, userId}) {
  const navigation = useNavigation();

  const [likePost, setLikePost] = useState(data?.likes);

  async function handleLikePost(id, likes) {
    const docId = `${data.userId}_${id}`;

    //Checar o post curtido

    const doc = await firestore().collection('likes').doc(docId).get();

    if (doc.exists) {
      //Quer dizer que já curtiu o post, então precisa remover
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: likes - 1,
        });

      await firestore()
        .collection('likes')
        .doc(docId)
        .delete()
        .then(() => {
          setLikePost(likes - 1);
        });
      return;
    }

    //Precisamos dar o like no post

    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        likes: likes + 1,
      })
      .then(setLikePost(likes + 1));
  }

  function formatTimePost() {
    //console.log(new Date(data?.created * 1000));

    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, {
      locale: ptBR,
    });
  }

  return (
    <Container>
      <Header
        onPress={() => {
          navigation.navigate('PostUser', {
            title: data.autor,
            userId: data.userId,
          });
        }}>
        {data.avatarUrl ? (
          <Avatar source={{uri: data.avatarUrl}} />
        ) : (
          <Avatar source={require('../../assets/avatar.png')} />
        )}

        <Name numerOfLines={1}>{data?.autor}</Name>
      </Header>

      <ContentView>
        <Content> {data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton
          onPress={() => {
            handleLikePost(data.id, likePost);
          }}>
          <Like>{likePost === 0 ? '' : likePost}</Like>

          <MaterialCommunityIcons
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />
        </LikeButton>
        <TimePost> {formatTimePost()} </TimePost>
      </Actions>
    </Container>
  );
}

export default PostLists;
