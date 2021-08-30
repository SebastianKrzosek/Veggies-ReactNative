import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Bar = () => {
  return (
    <View style={styles.bar}>
      <View style={[styles.barItem, styles.barseparator]}>
        <Text style={styles.barTop}>Godziny Otwarcia</Text>
        <Text>
          <Text style={styles.barBottom}>Pon: </Text>
          <Text style={styles.barBottom}>Wt: </Text>
        </Text>
        <Text>
          <Text style={styles.barBottom}>Śr: </Text>
          <Text style={styles.barBottom}>Czw: </Text>
        </Text>
        <Text>
          <Text style={styles.barBottom}>Pt:</Text>
          <Text style={styles.barBottom}>Sb:</Text>
        </Text>
        <Text style={styles.barBottom}>Nd:</Text>
      </View>
      <View style={styles.barItem}>
        <Text style={styles.barTop}>Adres</Text>
        <Text style={styles.barBottom}>Chopina 16/12</Text>
        <Text style={styles.barBottom}>Toruń</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    borderTopColor: '#fff',
    borderTopWidth: 4,
    backgroundColor: '#29ba2e',
    flexDirection: 'row',
  },
  barseparator: {
    borderRightWidth: 4,
  },
  barItem: {
    flex: 1,
    padding: 18,
    alignItems: 'center',
  },
  barTop: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  barBottom: {
    textAlign: 'auto',
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Bar;
