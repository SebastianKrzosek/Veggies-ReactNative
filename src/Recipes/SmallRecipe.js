import React from 'react';
import {View, Text, Image} from 'react-native';

const SmallRecipe = ({title, path}) => {
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
      <View
        style={{
          margin: 10,
          borderRadius: 15,
          backgroundColor: '#FDD7E4',
          alignSelf: 'stretch',
          textAlign: 'center',
        }}>
        <Image
          style={{width: 340, height: 200, borderRadius: 15}}
          source={{
            uri: path,
          }}
        />
      </View>
    </View>
  );
};
export default SmallRecipe;
