import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";
import { universalPaddingHorizontal } from "../../../theme/dimens";

const styles = StyleSheet.create({
  mainPadding: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
  doctor: {
    height: 100,
    width: 100,
    alignItems: "center",
    marginHorizontal: 16,
  },
  container: {
    marginHorizontal: 16,
  },

  middleContainer: {
    marginVertical: 46,
  },
  selfieContainer: {
    marginTop: 10,
    padding: 5,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
  },
  selfie: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
  pdf: {
    height: 80,
    width: 80,
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
  },
  pdfContainer: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 6,
  },
  documents: {
  },
  common: {
    flexDirection: "row",
  },
  description: {
    marginTop: 18,
  },
  buttonContainer: {
    padding: universalPaddingHorizontal,
    elevation: 10,
    backgroundColor: colors.mainBg,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  documentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pdf_two: {
    height: 120,
    width: 120,
    borderRadius: 8,
    marginTop: 16,
    justifyContent: "center",
  },
});

export default styles;
