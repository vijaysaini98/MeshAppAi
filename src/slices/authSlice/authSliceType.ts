export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  userData?: any;
  isSuccessVisible: boolean;
  countryList: any[];
  stateList: any[];
  cityList: any[];
  urlTypes: any[];
  deviceClass: any[];
  bluetoothVersion: any[];
  wlanAuth: any[];
  wlanEnc: any[];
  languageCode: any[];
  nfcTags: any[];
  savedList: any[];
  qrCodes: any[];
  tagDetail?: any;
}

export interface LoginProps {
  email: string;
  password: string;
  fcm_token: string | null;
}

export interface LoginApiResponse {
  status: boolean;
  message: string;
  data: LoginApiData;
  code: number;
}

export interface LoginApiData {
  token: string;
  access_token: string;
}
export interface ForgotPasswordProps {
  email: string;
}

export interface UpdatePasswordProps {
  verification_code: number;
  new_password: number;
}

export interface ChangePasswordProps {
  status: boolean;
  message: string;
  data: string;
}

export interface RegisterProps {
  status: boolean;
  message: string;
  data: Token;
}

export interface Token {
  token: string;
}
