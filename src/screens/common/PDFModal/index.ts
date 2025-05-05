import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN_KEY } from "../../../helper/Constants";
import { pick, types, isErrorWithCode } from "@react-native-documents/picker";
import { config } from "../../../../config/config";

export const PDFModal = (
  setPdfDetails,
  setAPiResponse,
  setLoader,
  onSucess
) => {
  const onSelectFile = async () => {
    try {

      // Pick a single file (PDF type)
      const DocRes = await pick({
        type: [types.pdf],
      });
      let res = DocRes[0];
      let formData = new FormData();
      formData.append("file", {
        uri: res.uri,
        type: res.type || "application/pdf",
        name: res.name,
      });

      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

      if (setPdfDetails) {
        setPdfDetails({
          uri: res.uri,
        });
      }

      if (setLoader) {
        setLoader(true);
      }

      const result = await fetch(`${config.WEBSITE_URL}upload/pdf`, {
        method: "post",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseJson = await result.json();

      if (setAPiResponse) {
        if (setLoader) {
          setLoader(false);
        }

        if (onSucess) {
          onSucess(responseJson);
        } else {
          setAPiResponse(responseJson?.data?.[0]?.path);
        }
      }
    } catch (err) {
      console.log("Error during file upload:", err);

      if (isErrorWithCode(err)) {
        // Handle user cancellation
      } else {
        // Handle other errors
      }

      if (setLoader) {
        setLoader(false);
      }
    } finally {
      if (setLoader) {
        setLoader(false);
      }
    }
  };

  onSelectFile();
};
