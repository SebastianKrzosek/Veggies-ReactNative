import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import Post from './Post';

const PostsComponent = () => {
  return (
    <ScrollView>
      <View style={styles.postGrid}>
        <Text style={{color: 'white', fontSize: 24}}>Posty:</Text>
        <View style={styles.postWrap}>
          <Post />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  postGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  postWrap: {
    margin: 2,
    width: Dimensions.get('window').width - 4,
  },
});
export default PostsComponent;
