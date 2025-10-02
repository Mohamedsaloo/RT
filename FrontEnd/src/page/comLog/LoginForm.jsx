// LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import Field from "./shared/Field";

export default function LoginForm({ onChangeView }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);
  const [serverMessage, setServerMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setServerMessage(null);

    if (form.email && form.password) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, form);
        setStatus("success");
        setServerMessage(res.data.message || "تم تسجيل الدخول بنجاح");
      } catch (error) {
        setStatus("error");
        setServerMessage(error.response?.data?.message || "فشل تسجيل الدخول");
      }
    } else {
      setStatus("error");
      setServerMessage("يرجى ملء جميع الحقول");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-cairo">
      <h2 className="text-2xl font-bold text-center text-black/80">تسجيل الدخول</h2>

      <Field label="البريد الإلكتروني" htmlFor="email">
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="input-style"
          placeholder="example@mail.com"
        />
      </Field>

      <Field label="كلمة المرور" htmlFor="password">
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input-style"
          placeholder="••••••••"
        />
      </Field>

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "جارٍ المعالجة..." : "دخول"}
      </button>

      {status && <p className={`text-center text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{serverMessage}</p>}

      <div className="text-center space-y-1 pt-3">
        <button type="button" onClick={() => onChangeView("register")} className="link">
          ليس لديك حساب؟ سجل الآن
        </button>
        <br />
        <button type="button" onClick={() => onChangeView("reset")} className="link">
          نسيت كلمة المرور؟
        </button>
      </div>
    </form>
  );
}
