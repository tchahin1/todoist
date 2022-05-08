import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState();
  const [startPoint, setStartPoint] = useState();
  const [swipedTask, setSwipedTask] = useState();
  const [swipedTaskCompleteness, setSwipedTaskCompleteness] = useState();

  useEffect(() => {
    axios
      .get('https://api.todoist.com/rest/v1/tasks', {
        headers: {
          Authorization: 'Bearer ab9855583345f7886c83ac8d4afffe0832c7e975',
        },
      })
      .then(res => {
        setData(res.data);
        console.log(res);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, height: '100%', width: '100%'}}>
        {data &&
          data.length !== 0 &&
          data.map((task, index) => {
            return (
              <View key={task.id} style={{width: '100%', height: 50}}>
                <Text style={{color: task.completed ? 'green' : 'red'}}>
                  {task.content}
                </Text>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
