/* eslint-disable react/no-unstable-nested-components */
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationService from "./NavigationService";
import * as routes from "./routes";
import * as React from "react";
import { TransitionPresets } from "@react-navigation/stack";
import { commonStyles } from "../theme/commonStyles";
import { colors } from "../theme/colors";
import { Image, View } from "react-native";
import AuthLoading from "../screens/common/AuthLoading";
import Welcome from "../screens/common/Welcome";
import Login from "../screens/common/Login";
import { tabAppointment, tabHome, tabMore } from "../helper/ImageAssets";
import Home from "../screens/mr/Home/Home";
import { AppText, MEDIUM, WHITE } from "../common";
import { universalPaddingHorizontal } from "../theme/dimens";
import Appointment from "../screens/mr/Appointment";
import DoctorProfile from "../screens/mr/DoctorProfile";
import DoctorList from "../screens/mr/DoctorList";
import RequestAppointment from "../screens/mr/RequestAppointment";
import UpcomingAppointment from "../screens/mr/UpcomingAppointment";
import RescheduleAppointment from "../screens/mr/RescheduleAppointment";
import RecoverPassword from "../screens/mr/RecoverPassword";
import ResetPassword from "../screens/mr/ResetPassword";

import MeetingReport from "../screens/mr/MeetingReport";
import DoctorHome from "../screens/doctor/Home/Home";
import MoreScreen from "../screens/mr/MoreScreen";
import PaymentHistory from "../screens/common/paymentHistory";
import Settings from "../screens/common/Settings";
import Selfie from "../screens/mr/SelfieScreen";
import Notification from "../screens/common/Notifications";
import ClaimProfile from "../screens/doctor/claimProfile";
import DoctorAppointment from "../screens/doctor/Appointment";
import AddMyProfile from "../screens/doctor/AddMyProfile";
import EditProfile from "../screens/doctor/EditProfile";
import Verification from "../screens/common/Verification";
import DoctorMoreScreen from "../screens/doctor/DoctorMoreScreen";
import DoctorAvailabilityScreen from "../screens/doctor/DoctorAvailabiltyScreen";
import RecentRequest from "../screens/doctor/RecentRequest";
import DrRescheduleAppointment from "../screens/doctor/DrRescheduleAppointment";
import DoctorsDetails from "../screens/common/DoctorsDetails";
import PaymentMethod from "../screens/mr/PaymentMethod";
import RecentRequestDetails from "../screens/doctor/RecentRequestDetail";
import RatingScreen from "../screens/common/RatingScreen";
import DoctorSettings from "../screens/doctor/DoctorSetting";
import ChangePasswordScreen from "../screens/doctor/ChangePassword";
import PdfView from "../screens/common/ViewPdf";
import PaymentSuccess from "../screens/mr/PaymentSuccess";
import PaymentReceipt from "../screens/common/paymentReceipt";
import DoctorPaymentHistory from "../screens/doctor/paymentHistory";
import DoctorPaymentReceipt from "../screens/doctor/paymentReceipt";
import WebViewScreen from "../screens/common/webView";
import MyLocation from "../screens/doctor/ MyLocation";
import AddLocation from "../screens/doctor/ MyLocation/addLocation";
import { SectionListChangeDrTabScreen } from "../slices/drSlice/drSlice";
import { useAppDispatch } from "../store/hooks";
import AddMr from "../screens/mr/AddMr";
import Products from "../screens/mr/Products";
import AddProduct from "../screens/mr/Products/addProduct";
import CallingScreen from "../screens/doctor/CallingScreen";
import Clinic from "../screens/doctor/Clinic";
import ClinicRequest from "../screens/doctor/Clinic/clinicRequest";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const options = { ...TransitionPresets.SlideFromRightIOS, headerShown: false };

const TabIcon = ({ focused, icon, title }: any) =>
  focused ? (
    <View style={commonStyles.tabFocused}>
      <AppText color={WHITE} weight={MEDIUM}>
        {title}
      </AppText>
    </View>
  ) : (
    <View style={{}}>
      <Image source={icon} style={commonStyles.tabIcon} resizeMode="contain" />
    </View>
  );

const MyAuthLoadingStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_SCREEN}
      component={AuthLoading}
    />

    <Stack.Screen name={routes.NAVIGATION_AUTH_STACK} component={AuthStack} />
    <Stack.Screen
      name={routes.NAVIGATION_MR_BOTTOM_TAB_STACK}
      component={MrBottomNavigation}
    />
    <Stack.Screen
      name={routes.NAVIGATION_DR_BOTTOM_TAB_STACK}
      component={DrBottomNavigation}
    />
    <Stack.Screen
      name={routes.DOCTOR_PROFILE_SCREEN}
      component={DoctorProfile}
    />
    <Stack.Screen name={routes.DOCTOR_LIST_SCREEN} component={DoctorList} />
    <Stack.Screen name={routes.PAYMENT_HISTORY} component={PaymentHistory} />
    <Stack.Screen name={routes.SETTINGS_SCREEN} component={Settings} />
    <Stack.Screen name={routes.SELFIE_SCREEN} component={Selfie} />
    <Stack.Screen name={routes.NOTIFICATION_SCREEN} component={Notification} />
    <Stack.Screen name={routes.CLAIM_PROFILE} component={ClaimProfile} />
    <Stack.Screen name={routes.RECENT_REQUEST} component={RecentRequest} />
    <Stack.Screen name={routes.PDF_VIEW} component={PdfView} />
    <Stack.Screen
      name={routes.PAYMENT_SUCCESS_SCREEN}
      component={PaymentSuccess}
    />
    <Stack.Screen
      name={routes.PAYMENT_RECEIPT_SCREEN}
      component={PaymentReceipt}
    />

    <Stack.Screen
      name={routes.DOCTOR_SETTINGS_SCREEN}
      component={DoctorSettings}
    />
    <Stack.Screen
      name={routes.DOCTOR_CHANGE_PASSWORD_SCREEN}
      component={ChangePasswordScreen}
    />
    <Stack.Screen
      name={routes.DOCTOR_RESCHEDULE_APPOINTMENTS}
      component={DrRescheduleAppointment}
    />

    <Stack.Screen
      name={routes.REQUEST_APPOINTMENT_SCREEN}
      component={RequestAppointment}
    />
    <Stack.Screen
      name={routes.UPCOMING_APPOINTMENT_SCREEN}
      component={UpcomingAppointment}
    />
    <Stack.Screen
      name={routes.RESCHEDULE_APPOINTMENT_SCREEN}
      component={RescheduleAppointment}
    />
    <Stack.Screen
      name={routes.RECOVER_PASSWORD_SCREEN}
      component={RecoverPassword}
    />
    <Stack.Screen
      name={routes.RESET_PASSWORD_SCREEN}
      component={ResetPassword}
    />
    <Stack.Screen name={routes.MEETING_REPORT} component={MeetingReport} />
    <Stack.Screen name={routes.MOBILE_VERIFICATION} component={Verification} />
    <Stack.Screen name={routes.EDIT_PROFILE} component={EditProfile} />
    <Stack.Screen
      name={routes.DOCTOR_AVAILABILITY_SCREEN}
      component={DoctorAvailabilityScreen}
    />
    <Stack.Screen name={routes.ADD_MY_PROFILE} component={AddMyProfile} />
    <Stack.Screen
      name={routes.DOCTOR_DATA_DETAILS}
      component={DoctorsDetails}
    />
    <Stack.Screen
      name={routes.PAYMENT_METHOD_SCREEN}
      component={PaymentMethod}
    />
    <Stack.Screen
      name={routes.RECENT_REQUEST_DETAIL}
      component={RecentRequestDetails}
    />
    <Stack.Screen name={routes.RATING_SCREEN} component={RatingScreen} />
    <Stack.Screen
      name={routes.DOCTOR_PAYMENT_SCREEN}
      component={DoctorPaymentHistory}
    />
    <Stack.Screen
      name={routes.DOCTOR_PAYMENT_RECEIPT}
      component={DoctorPaymentReceipt}
    />
    <Stack.Screen name={routes.WEBVIEWE_SCREEN} component={WebViewScreen} />

    <Stack.Screen name={routes.MY_LOCATION} component={MyLocation} />
    <Stack.Screen name={routes.ADD_LOCATION} component={AddLocation} />
    <Stack.Screen name={routes.ADD_MR} component={AddMr} />
    <Stack.Screen name={routes.PRODUCTS} component={Products} />
    <Stack.Screen name={routes.ADDPRODUCT} component={AddProduct} />
    <Stack.Screen name={routes.CALLING_SCREEN} component={CallingScreen} />
    <Stack.Screen name={routes.CLINIC} component={Clinic} />
    <Stack.Screen name={routes.CLINIC_REQUST} component={ClinicRequest} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.WELCOME_SCREEN} component={Welcome} />
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
  </Stack.Navigator>
);
function MrBottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={routes.MR_HOME_SCREEN}
      backBehavior={"history"}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.tabBg,
          height: 70,
          borderTopWidth: 0,
          paddingTop: 15,
          paddingHorizontal: universalPaddingHorizontal,
        },

        tabBarIconStyle: {},
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {},
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name={routes.MR_APPOINTMENT_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabAppointment}
              title={"My Appointments"}
            />
          ),
        }}
        component={Appointment}
      />

      <Tab.Screen
        name={routes.MR_HOME_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={tabHome} title={"Home"} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={routes.MR_MORE_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={tabMore} title={"More"} />
          ),
        }}
        component={MoreScreen}
      />
    </Tab.Navigator>
  );
}

function DrBottomNavigation() {
  const dispatch = useAppDispatch();
  return (
    <Tab.Navigator
      initialRouteName={routes.DR_HOME_SCREEN}
      backBehavior={"history"}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.tabBg,
          height: 70,
          borderTopWidth: 0,
          paddingTop: 15,
          paddingHorizontal: universalPaddingHorizontal,
        },

        tabBarIconStyle: {},
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {},
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name={routes.DR_APPOINTMENT_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={tabAppointment}
              title={"My Appointments"}
            />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            dispatch(SectionListChangeDrTabScreen(0));
          },
        })}
        component={DoctorAppointment}
      />

      <Tab.Screen
        name={routes.DR_HOME_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={tabHome} title={"Home"} />
          ),
        }}
        component={DoctorHome}
      />
      <Tab.Screen
        name={routes.DOCTOR_MORE_SCREEN}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={tabMore} title={"More"} />
          ),
        }}
        component={DoctorMoreScreen}
      />
    </Tab.Navigator>
  );
}

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_STACK}
      component={MyAuthLoadingStack}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer
      theme={DarkTheme}
      ref={(navigationRef) => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}
    >
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
