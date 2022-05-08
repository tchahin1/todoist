import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';

const TaskModal = props => {
  const [title, setTitle] = useState();
  const [changeButton, setChangeButton] = useState(false);

  useEffect(() => {
    setTitle(props.taskInfo?.content);
  }, [props]);

  const getPriorityString = priority => {
    switch (priority) {
      case 1:
        return 'Normal';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      case 4:
        return 'Urgent';
      default:
        return 'N/A';
    }
  };

  const saveChanges = () => {
    //request passes in Postman but not in react-native for some reason...
    axios
      .post(`https://api.todoist.com/rest/v1/tasks/${props.taskInfo.id}`, {
        data: {
          content: title,
        },
        headers: {
          Authorization: 'Bearer ab9855583345f7886c83ac8d4afffe0832c7e975',
        },
      })
      .then(res => {
        setChangeButton(false);
        axios
          .get('https://api.todoist.com/rest/v1/tasks', {
            headers: {
              Authorization: 'Bearer ab9855583345f7886c83ac8d4afffe0832c7e975',
            },
          })
          .then(response => {
            props.refetchData(response.data);
          })
          .catch(e => console.log(e));
      })
      .catch(e => {
        console.log(e);
        setChangeButton(false);
      });
  };

  return (
    <Modal
      isVisible={props.opened}
      animationIn={'slideInRight'}
      animationOut={'slideOutLeft'}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => (changeButton ? saveChanges() : props.onClose())}
          style={styles.close}>
          <Text style={styles.closeText}>{changeButton ? 'SAVE' : 'X'}</Text>
        </TouchableOpacity>
        <View style={styles.taskInfoContainer}>
          <Text style={styles.title}>TASK INFO:</Text>
          <View style={styles.infoWrapper}>
            {/* in order to edit all the other fields similar input fields should be added */}
            <View style={styles.inputWrapper}>
              <Text>Content:</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                onFocus={() => setChangeButton(true)}
              />
            </View>
            <Text>Priority: {getPriorityString(props.taskInfo?.priority)}</Text>
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
    paddingBottom: 40,
  },
  close: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
  },
  closeText: {fontWeight: '800'},
  title: {fontSize: 20},
  taskInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {marginTop: 20},
  inputWrapper: {flexDirection: 'row'},
});

export default TaskModal;
