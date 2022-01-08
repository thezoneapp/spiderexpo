import styled from 'styled-components/native';
import { getStatusBarHeight } from "react-native-status-bar-height";

const STATUS_BAR_HEIGHT = getStatusBarHeight();
console.log(STATUS_BAR_HEIGHT);
export const Container = styled.View`
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: ${STATUS_BAR_HEIGHT}px;
`;
