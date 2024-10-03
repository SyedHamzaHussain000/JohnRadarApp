import { View, ActivityIndicator, Modal } from "react-native";
import React from "react";
import { styles } from "./index.style";
// import { COLORS } from "../../utils/COLORS";
import { Fold } from "react-native-animated-spinkit";
import { COLORS } from "../../Constants/theme";

const LoaderModal = ({ visible, style, color, size }) => {
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
          <Fold
            color={color ? color : COLORS.primary}
            size={size ? size : 40}
            style={[{ marginTop: 10, alignSelf: "center" }, style]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;
