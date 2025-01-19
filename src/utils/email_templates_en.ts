export const getTemplateVerificationEmail_EN = (code: string) => `
<div>
    <h1>Hello</h1>
    <p>Your verification code is: <strong>${code}</strong></p>
    <p>Please enter it in the app to verify your email address.</p>
</div>`;

export const getTemplateSuccessEmail_EN = (name: string) => `
<div>
  <h1>Welcome, ${name}!</h1>
  <p>Your registration in AstroPalm has been successful.</p>
</div>`;

export const getTemplatePasswordRecovery_EN = (code: string) => `
<div>
    <p>Your recovery code is: <strong>${code}</strong></p>
    <p>Please enter it in the app to recover your password.</p>
</div>`;

export const subjectVerification_en = "Email Verification";
export const subjectRegister_en = "Successfull Registration";
export const subjectRecoveryPass_en = "Recovery Password";
