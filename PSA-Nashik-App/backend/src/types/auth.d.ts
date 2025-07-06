


export interface SendOTPRequest {
  phone: string;
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  error?: string;
}


