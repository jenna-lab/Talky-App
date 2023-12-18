import ejs from "ejs";
import sendMail from "./Email";

export const resetPassword = async (email: string, new_password: string) => {
  console.log(process.env);

  ejs.renderFile(
    "templates/resetPwd.ejs",
    { email, new_password },
    async (error: any, data: any) => {
    

      if (error) {
        console.log(error);
      } else {
        let mailOptions = {
          from: "jensam209@gmail.com",
          to: email,
          subject: "Reset password",
          html: data,
        };

        try {
          await sendMail(mailOptions);

          console.log("Emails send to " + email);

          return true
        } catch (error) {
          console.log(error);
        }
      }
    }
  );
};
