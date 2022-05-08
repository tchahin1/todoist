import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import TaskModal from './TaskModal';

const App = () => {
  const [data, setData] = useState();
  const [startPoint, setStartPoint] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

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

  const updateTask = (swipedTask, completeness) => {
    console.log(swipedTask, completeness);
    axios
      .post(`https://api.todoist.com/rest/v1/tasks/${swipedTask}`, {
        data: {
          //there is no completed field for updating? how to change the status of completeness for the task ?
          //completed: !completeness,
        },
        headers: {
          Authorization: 'Bearer ab9855583345f7886c83ac8d4afffe0832c7e975',
        },
      })
      .then(res => {
        setData(res.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        {data &&
          data.length !== 0 &&
          data.map((task, index) => {
            return (
              <View
                key={task.id}
                style={styles.taskWrapper}
                onTouchStart={e => setStartPoint(e.nativeEvent.pageX)}
                onTouchEnd={e => {
                  console.log(startPoint, e.nativeEvent.pageX);
                  if (startPoint - e.nativeEvent.pageX > 100) {
                    updateTask(task.id, task.completed);
                  } else {
                    setSelectedTask(task);
                    setOpenModal(true);
                  }
                }}>
                <Text style={{color: task.completed ? 'green' : 'red'}}>
                  {/*I just noticed this should be a "contact" field but I can't seem to understand or see that field in the response*/}
                  {task.content}
                </Text>
              </View>
            );
          })}
      </ScrollView>
      <TaskModal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        taskInfo={selectedTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskWrapper: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
    marginTop: 30,
  },
  scrollContainer: {flex: 1, height: '100%', width: '100%'},
  scrollContentContainer: {paddingHorizontal: 20},
  container: {flex: 1},
});

export default App;
