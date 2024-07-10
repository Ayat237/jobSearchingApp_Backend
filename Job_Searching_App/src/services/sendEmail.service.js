import nodemailer from 'nodemailer';

/**
 * @param {object} params => object of email params
 * @returns {Promise}     => Promise object represents the info of the sent email
 * @description           => Send email service
 */

export const sendEmail = async(to ,subject, html)=>{
    const transporter = nodemailer.createTransport({
       service : "gmail",
        auth: {
          user: "yoka91011@gmail.com",
          pass: "gjofywgrqmdvbdtu",//vaagchfmbudxkqui
        },
      });
    const info = await transporter.sendMail({
        from: '"Ayat "yoka91011@gmail.com',
        to: to? to : "",
        subject: subject? subject : "hi", 
        html: html ? html : "hello"
    })
    if(info.accepted.length){
        return true;
    }
    return false;
}