import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Description = () => {
  return (
    <View style={styles.bar}>
      <Text style={styles.barTop}>Opis</Text>
      <Text style={styles.barBottom}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
        molestie augue. Duis in arcu bibendum, commodo mi ut, dictum purus. Duis
        volutpat felis dui, vitae sollicitudin enim auctor vel.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderTopColor: '#fff',
    borderTopWidth: 4,
    backgroundColor: '#29ba2e',
    alignItems: 'center',
  },
  barTop: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  barBottom: {
    padding: 10,
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Description;
