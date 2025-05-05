import React, { useState } from "react";
import { View, Button, Text } from "react-native";
// import DocumentPicker from "react-native-document-picker";
import { pick,types,isErrorWithCode } from '@react-native-documents/picker'

const Pdf = () => {
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await pick({
        type: [types.allFiles],
      });

      setPickedDocument(result);
    } catch (err) {
      if (isErrorWithCode(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Pick Document" onPress={pickDocument} />
      {pickedDocument && (
        <View>
          <Text>Picked Document Details:</Text>
          <Text>URI: {pickedDocument.uri}</Text>
          <Text>Type: {pickedDocument.type}</Text>
          <Text>Name: {pickedDocument.name}</Text>
          <Text>Size: {pickedDocument.size} bytes</Text>
        </View>
      )}
    </View>
  );
};

export default Pdf;
