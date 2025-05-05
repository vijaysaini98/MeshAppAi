import React from "react";
import { StyleSheet, Dimensions, View, Platform } from "react-native";
import Pdf from "react-native-pdf";

const source = {
  uri: `https://www.africau.edu/images/default/sample.pdf`,
};
const PdfView = () => {
  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        trustAllCerts={Platform.OS === "ios"}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`current page: ${page}`);
        }}
        onError={(error) => {
          // console.log("error of pdf", error);
        }}
        onPressLink={(uri) => {
          // console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
        trustAllCerts={false}
      />
    </View>
  );
};

export default PdfView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
