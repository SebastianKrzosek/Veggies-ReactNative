import React from 'react';
import {View, Text} from 'react-native';

const singleVeganSubstiute = ({
  name,
  kcal,
  protein,
  fat,
  carbs,
  cellulose,
  category,
}) => {
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
      <Text style={{fontSize: 18, color: 'white'}}>Karolie: {kcal}</Text>
      <Text style={{fontSize: 18, color: 'white'}}>Proteiny: {protein}</Text>
      <Text style={{fontSize: 18, color: 'white'}}>Tłuszcz: {fat}</Text>
      <Text style={{fontSize: 18, color: 'white'}}>Węgiel: {carbs}</Text>
      <Text style={{fontSize: 18, color: 'white'}}>Celuloza: {cellulose}</Text>
      <Text style={{fontSize: 18, color: 'white'}}>Kategoria: {category}</Text>
    </View>
  );
};

export default singleVeganSubstiute;
