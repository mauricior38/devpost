import React, {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import {Container, ButtonPost, ListPosts} from './styles';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import Header from '../../components/Header';
import PostList from '../../components/PostsList';

import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';

function Home() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [loadingRefresh, setLoadingRefresh] = useState(false);
  const [lastItem, setLastItem] = useState('');
  const [emptyList, setEmptyList] = useState(false);

  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts() {
        firestore()
          .collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then(snapshot => {
            if (isActive) {
              setPosts([]);

              const postList = [];

              snapshot.docs.map(u => {
                postList.push({
                  ...u.data(),
                  id: u.id,
                });
              });
              setEmptyList(!!snapshot.empty);
              setPosts(postList);
              setLastItem(snapshot.docs[snapshot.docs.length - 1]);
              setLoading(false);
            }
          });
      }

      fetchPosts();

      return () => {
        isActive = false;
      };
    }, []),
  );

  //Buscar mais posts quando puxar a lista para cima
  async function handleRefreshPosts() {
    setLoadingRefresh(true);

    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        setPosts([]);

        const postList = [];

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });
        setEmptyList(false);
        setPosts(postList);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    setLoadingRefresh(false);
  }

  //buscar mais posts ao chegar no final da lista
  async function getListPosts() {
    if (emptyList) {
      //se buscou a lista, tira o loading.
      setLoading(false);
      return null;
    }

    if (loading) {
      return;
    }

    firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .limit(5)
      .startAfter(lastItem)
      .get()
      .then(snapshot => {
        const postList = [];

        snapshot.docs.map(u => {
          postList.push({
            ...u.data(),
            id: u.id,
          });
        });
        setEmptyList(snapshot.empty);
        setLastItem(snapshot.docs[snapshot.docs.length - 1]);
        setPosts(oldPosts => [...oldPosts, ...postList]);
        setLoading(false);
      });
  }

  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={50} color="#E52246" />
        </View>
      ) : (
        <ListPosts
          data={posts}
          renderItem={({item}) => <PostList data={item} userId={user?.uid} />}
          refreshing={loadingRefresh}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefreshPosts}
          onEndReached={() => getListPosts()}
          onEndReachedThreshold={0.1}
        />
      )}

      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#fff" size={25} />
      </ButtonPost>
    </Container>
  );
}

export default Home;
