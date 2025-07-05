


declare namespace Auth {
  interface SendOTPRequest {
    phone: string;
  }

  interface VerifyOTPRequest {
    phone: string;
    otp: string;
  }

  interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    error?: string;
  }
}


