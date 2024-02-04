import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView} from 'react-native';

const {height} = Dimensions.get('window');

const App = () => {
  // Kullanıcı tercihlerini tutacak state'ler
  const [choice1Count, setChoice1Count] = useState(0);
  const [choice2Count, setChoice2Count] = useState(0);

  // Tercih yapıldığında çağrılacak fonksiyonlar
  const onChooseOption1 = () => {
    setChoice1Count(choice1Count + 1);
  };

  const onChooseOption2 = () => {
    setChoice2Count(choice2Count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.choice, {backgroundColor: '#ADD8E6', marginVertical: 20}]} onPress={onChooseOption1}>
          <Text style={styles.choiceText}>Tercih 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.choice, {backgroundColor: '#FFB6C1', marginVertical: 20}]} onPress={onChooseOption2}>
          <Text style={styles.choiceText}>Tercih 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  choice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  choiceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
