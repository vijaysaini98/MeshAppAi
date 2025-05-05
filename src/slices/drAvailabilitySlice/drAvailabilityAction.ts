import { appOperation } from "../../appOperation";
import { setLoading, setdrAvailabilityList } from "../drSlice/drSlice";
import Toast from "react-native-simple-toast";

export const addDoctorSlots =
  (data?:any, onSucess?:any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.add_slot(data);
      if (response?.code === 200) {
        Toast.show(response?.message, Toast.LONG);
        if (onSucess) {
          onSucess();
        }
      }
    } catch (e: any) {
      console.log("Error of addDoctorSlots", e);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteDoctorSlots =
  (data?:object, onSucess?:()=>void) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.delete_slot(data);
      if (response?.code === 200 && response?.success) {
        onSucess();
      }
      Toast.show(response?.message, Toast.LONG);
    } catch (e: any) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAvailability =
  (data: any) => async (dispatch: Dispatch<any>) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_slots(data);
      if (response?.code === 200) {
        dispatch(setdrAvailabilityList(response?.data));
      }
    } catch (e: any) {
      console.log("error message is doctors get slot",e);
    } finally {
      dispatch(setLoading(false));
    }
  };
