import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";

import { Circle } from "react-native-animated-spinkit";
import { COLORS } from "../../Constants/theme";
import { styles } from "./index.style";
// import { COLORS } from "../../utils/COLORS";

const WaveLoader = ({ style, color, size, visible }) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.main_view}>
        <View
          style={{
            backgroundColor: "white",
            height: 100,
            width: 100,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <Circle
            color={color ? color : COLORS.primary}
            size={size ? size : 50}
            style={[{ marginTop: 10, alignSelf: "center" }, style]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default WaveLoader;
