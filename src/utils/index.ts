import { showMessage, hideMessage } from 'react-native-flash-message';

export type MessageType = "none" | "default" | "info" | "success" | "danger" | "warning";

interface ToastMessageProps {
  type: MessageType;
  description: string;
}

export const showToastMessage = ({ type, description }: ToastMessageProps): void => {
  showMessage({
    message: 'App',
    description: description,
    onPress: () => {
      hideMessage();
    },
    type: type,
  });
};