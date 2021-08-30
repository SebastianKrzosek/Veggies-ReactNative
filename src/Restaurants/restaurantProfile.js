import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import Header from './Header';
import Bar from './Bar';
import Description from './Description';
import Posts from './PostsComponent';

const ProfilePage = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Bar />
        <Description />
        <Posts />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
export default ProfilePage;
