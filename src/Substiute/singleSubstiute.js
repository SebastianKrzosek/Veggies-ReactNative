import React from 'react';
import {View, Text} from 'react-native';

const singleSubstitute = ({name, description}) => {
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
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          fontStyle: 'italic',
          color: 'white',
        }}>
        {name}
      </Text>
      <Text style={{fontSize: 18, color: 'white'}}>{description}</Text>
    </View>
  );
};

export default singleSubstitute;
