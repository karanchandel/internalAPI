// utils/pushToZypeApi.js
const axios = require("axios");

const ZYPE_API_URL = "http://74.225.151.113/api/2.0/keshva07/partnersAPIs/zype/create";

async function pushUserToZype(user) {
  const payload = {
    name: user.name,
    phone: String(user.phone),
    email: user.email || `${user.phone}@example.com`,
    employment: user.employment || "Salaried",
    pan: user.pan,
    pincode: String(user.pincode || "000000"),
    income: String(user.income || 0),
    state: user.state || "MH",
    gender: user.gender?.toLowerCase() || "male",
    city: user.city || "Not Provided",
    dob: user.dob || "",
    creditScore: user.creditScore != null ? Number(user.creditScore) : 700,
    SalaryType: user.salaryType || "bank transfer",
    CompanyName: user.companyName || "",
    UserPostion: user.userPosition || "",
    CompanyAddress: user.companyAddress || "",
    CompleteAddress: user.completeAddress || "",
    partner_Id: user.partnerId || "Zype5901cm78",
  };

  try {
    console.log("📤 Pushing to Zype:", payload.phone);

    const response = await axios.post(ZYPE_API_URL, payload, {
      headers: {
        Authorization: "zype-12345-s7dfw4e-key",
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Zype success:", response.data);
    return { status: "success", data: response.data };
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data;
    console.error("❌ Zype error:", status, data || err.message);
    return { status: "failed", statusCode: status, data: data || err.message };
  }
}

module.exports = { pushUserToZype };
