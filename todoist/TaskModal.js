import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

const TaskModal = props => {
  console.log(props);

  return (
    <Modal
      isVisible={props.opened}
      animationIn={'slideInRight'}
      animationOut={'slideOutLeft'}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => props.onClose()} style={styles.close}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <View style={styles.taskInfoContainer}>
          <Text style={styles.title}>TASK INFO:</Text>
          <View style={styles.infoWrapper}>
            <Text>Content: {props.taskInfo?.content}</Text>
            <Text>Priority: {props.taskInfo?.priority}</Text>
            <Text>Due Date: {props.taskInfo?.due?.date || 'N/A'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
  },
  close: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  closeText: {fontWeight: '800'},
  title: {fontSize: 20},
  taskInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {marginTop: 20},
});

export default TaskModal;
