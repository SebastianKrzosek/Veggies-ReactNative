import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const {width: WIDTH} = Dimensions.get('window');

const PostComment = ({author, text, imagePath}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbd8ce50',
        width: WIDTH - 80,
        borderRadius: 25,
        marginTop: 10,
        padding: 10,
      }}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
            // color: 'white',
          }}>
          {author}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            fontStyle: 'italic',
            //color: 'white',
          }}>
          {text}
        </Text>
      </View>
      {imagePath != null && (
        <Image
          style={{width: 250, height: 250, borderRadius: 15}}
          source={{uri: imagePath}}
        />
      )}
    </View>
  );
};
export default PostComment;
