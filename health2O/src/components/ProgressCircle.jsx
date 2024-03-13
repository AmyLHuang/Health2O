import CircularProgress from "react-native-circular-progress-indicator";

const ProgressCircle = ({ radius, percentage, color }) => (
  <CircularProgress
    radius={radius}
    value={percentage}
    valueSuffix={"%"}
    progressValueColor={"#EC268F"}
    activeStrokeColor={color}
    inActiveStrokeColor={color}
    inActiveStrokeOpacity={0.2}
    inActiveStrokeWidth={6}
  />
);

export default ProgressCircle;
