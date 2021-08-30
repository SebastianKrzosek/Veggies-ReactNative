import React from 'react';
import {View, Text, Image} from 'react-native';

const SmallPost = ({title, imagePath}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#dbd8ce50',
        width: '100%',
        borderRadius: 25,
        marginTop: 10,
        padding: 10,
      }}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: 'white',
          }}>
          {title}
        </Text>
      </View>
      {imagePath != null && (
        <Image
          style={{width: 200, height: 180, borderRadius: 15}}
          source={{uri: imagePath}}
        />
      )}
    </View>
  );
};
export default SmallPost;
