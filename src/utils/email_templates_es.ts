export const getTemplateVerificationEmail_ES = (code: string) => ` <div>
       <h1>Hola</h1>
      <p>Tu código de verificación es: <strong>${code}</strong></p>
      <p>Por favor, ingrésalo en la aplicación para verificar tu correo.</p>
    </div>`;

export const getTemplateSuccessEmail_ES = (name: string) => `
<div>
  <h1>¡Bienvenido, ${name}!</h1>
  <p>Tu registro en AstroPalm ha sido exitoso.</p>
</div>`;

export const getTemplatePasswordRecovery_ES = (code: string) => `<div>
<p>Tu código de recuperación es: <strong>${code}</strong></p>
<p>Por favor, ingrésalo en la aplicación para recuperar tu contraseña.</p>
</div>`;

export const subjectVerification_es = "Verificación de Email";
export const subjectRegister_es = "Registro Exitoso";
export const subjectRecoveryPass_es = "Recuperación de contraseña";
