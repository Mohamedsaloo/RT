// ResetPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Field from "./shared/Field";

export default function ResetPasswordForm({ onChangeView }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [serverMessage, setServerMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setServerMessage(null);

    if (email) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/reset-password`, { email });
        setStatus("success");
        setServerMessage(res.data.message || "تم إرسال رابط استعادة كلمة المرور");
      } catch (error) {
        setStatus("error");
        setServerMessage(error.response?.data?.message || "فشل إرسال البريد");
      }
    } else {
      setStatus("error");
      setServerMessage("يرجى إدخال البريد الإلكتروني");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-cairo">
      <h2 className="text-2xl font-bold text-center text-black/80">استعادة كلمة المرور</h2>

      <Field label="البريد الإلكتروني" htmlFor="email">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-style"
          placeholder="example@mail.com"
        />
      </Field>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة"}
      </button>

      {status && <p className={`text-center text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{serverMessage}</p>}

      <div className="text-center pt-3">
        <button type="button" onClick={() => onChangeView("login")} className="link">
          العودة لتسجيل الدخول
        </button>
      </div>
    </form>
  );
}
