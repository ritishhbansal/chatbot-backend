const User = require("../models/user");
const Chat = require("../models/chat");
const sendEmail = require("../utils/mailer");

exports.register = async (req, res, next) => {
    let {name, email, password} = req.body;
    console.log("register data is", name, email, password); 
    const find = await User.findbyemail(email);
    if(find) {
        res.status(400).json({ message: "User already exist" });
    }

    const user = new User(name, email, password);
    const saving = await user.save();
    const Email = await sendEmail(user.email, "Welcome to My Bot🚀",
         `<body style="margin:0;padding:0;background-color:#05060c;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#05060c;padding:30px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CARD -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.06);border-radius:14px;padding:32px;color:#ffffff;">
          
          <!-- LOGO -->
          <tr>
            <td style="text-align:center;padding-bottom:20px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:1px;">
                My <span style="color:#00f5ff;">Bot</span>
              </h1>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding-bottom:12px;">
              <h2 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">
                Welcome <strong>${user.fname}</strong> to My Bot 🤖
              </h2>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding-bottom:22px;font-size:14px;line-height:1.6;color:#cfd8ff;">
              Hi there,<br><br>
              We’re excited to have you onboard <strong>My Bot</strong> — your personal AI-powered assistant
              built to help you with coding, interviews, daily life questions, and much more.
              <br><br>
              Ask questions, learn faster, stay productive, and explore smarter conversations.
            </td>
          </tr>

          <!-- CTA BUTTON -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <a href="{{APP_URL}}" 
                 style="display:inline-block;padding:14px 32px;
                 background:linear-gradient(135deg,#00f5ff,#6f00ff);
                 color:#05060c;text-decoration:none;
                 border-radius:30px;font-weight:700;font-size:14px;">
                Start Chatting Now
              </a>
            </td>
          </tr>

          <!-- FEATURES -->
          <tr>
            <td style="padding:20px 0;font-size:13px;color:#b8c0ff;">
              🔹 Ask programming questions<br>
              🔹 Get interview preparation help<br>
              🔹 Talk about health, emotions & daily life<br>
              🔹 Smart and instant responses
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.1);padding-top:16px;font-size:12px;color:#9aa4ff;">
              If you didn’t create this account, you can safely ignore this email.
              <br><br>
              © 2026 My Bot. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
         `);

    return res.status(200).json({ //this is my successcode status
            userData:user,
        })
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    const user = await User.findbyemail(email);
    console.log("user details", user);
    if(!user){
         return res.status(400).json({ message: "User not found" });
    } else if (user.password === password) {
        req.session.isLoggedIn = true;
        const chats = await Chat.fetchbyId(user._id.toString());
        console.log("old chat are", chats);
        res.status(200).json({
            message: "Login successful",
            user: {
                userid: user._id,
                name: user.fname,
                email: user.email,
                },
            oldChats: chats
        });
    } else {
        console.log("This runnect")
        res.status(500).json({ message: "Password Invalid" });
    }
};

exports.logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful" });
  });
};

let otp;

exports.verifyemail = async (req, res, next) => {
    const {email } = req.body;
    console.log("email to verify is ", email);
     const user = await User.findbyemail(email);
    console.log("Found user for otp in backend", user);
    if(!user){
        res.status(400).json({message: "User not exists"})
    } else {
        otp = Math.floor(100000 + Math.random() * 600000);
        console.log("otp is", otp);
        const Email = sendEmail(email, "Verify Your Email Address – My Bot", 
            `<body style="margin:0;padding:0;background-color:#05060c;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#05060c;padding:30px 0;">
    <tr>
      <td align="center">

        <!-- MAIN CONTAINER -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.06);border-radius:14px;padding:36px;color:#ffffff;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding-bottom:22px;">
              <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:1px;">
                My <span style="color:#00f5ff;">Bot</span>
              </h1>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding-bottom:14px;">
              <h2 style="margin:0;font-size:22px;font-weight:700;">
                Verify Your Email Address 🔐
              </h2>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="font-size:14px;line-height:1.7;color:#cfd8ff;padding-bottom:26px;">
              Hi,<br><br>
              You requested to verify your email for <strong>My Bot</strong> 🤖  
              To continue securely, please use the OTP below to complete the verification process.
            </td>
          </tr>

          <!-- OTP BOX -->
          <tr>
            <td align="center" style="padding:20px 0;">
              <div style="
                display:inline-block;
                padding:16px 36px;
                background:linear-gradient(135deg,#00f5ff,#6f00ff);
                color:#05060c;
                border-radius:14px;
                font-size:26px;
                font-weight:700;
                letter-spacing:6px;">
                ${otp}
              </div>
            </td>
          </tr>

          <!-- OTP INFO -->
          <tr>
            <td style="font-size:13px;color:#b8c0ff;padding-bottom:22px;">
              ⏳ This OTP is valid for <strong>10 minutes</strong>.<br>
              ⚠️ For security reasons, do not share this code with anyone.
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <a href="{{APP_URL}}" 
                 style="
                 display:inline-block;
                 padding:12px 30px;
                 background:rgba(255,255,255,0.12);
                 color:#00f5ff;
                 text-decoration:none;
                 border-radius:24px;
                 font-size:13px;
                 font-weight:600;">
                Open My Bot
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.1);padding-top:18px;font-size:12px;color:#9aa4ff;">
              If you didn’t request this email, you can safely ignore it.<br><br>
              © ${new Date().getFullYear()} My Bot. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>`)
    }

    res.status(200).json({message: "otp sent"});
};

exports.enterOtp = async (req, res, next) => {
  const data = req.body;
  if(data.otp === String(otp) ){
    res.status(200).json({message: "Success"});
  } else {
    res.status(400).json({message: "Failed"});
  }
};

exports.newpass = async (req, res, next) => {
  const {email, password} = req.body;
  console.log("new pass data", email, password);
  const result = await User.updatePass(email, password);
  console.log("Updated Succesfully", result);
  res.status(200).json({message: "Success"});

}; 

