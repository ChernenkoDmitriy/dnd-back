export const mail = {
  PATH_CONF: 'http://localhost:3000/authorization/confirm-email?token=',
  PATH_FORGOT_PASS:
    'http://localhost:3000/authorization/forgot-password?token=',
  emailFrom: 's12122000@gmail.com',
};

export const htmlMail = (path: string, token: string, text: string): string => `
          <div style="display: flex; align-items: center; justify-content: center; margin-top:100px">
      <div style= "box-shadow: inset 1px 1px 13px 17px #90ee90; border-radius:50px; background-color: rgba(47,100,90,1); width: 800px; height: 600px; display: flex; align-items: center; justify-content: center ">
      <p style= "color: #90ee90; font-size: 30px; padding: 50px; text-align:center"; ><a href=${path}${token}>${text}</a></p>
      </div>
      </div>`;
