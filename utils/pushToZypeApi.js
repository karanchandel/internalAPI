// utils/pushToZypeApi.js
const axios = require("axios");

async function pushUserToZype(data) {
  const ZYPE_API_URL = "http://74.225.151.113/api/2.0/keshva07//partnersAPIs/zype/create";

  const normalizedData = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    employment: data.employment || "",
    pan: data.pan || "",
    pincode: data.pincode || "",
    income: data.income ? String(data.income) : "",
    state: data.state || "",
    gender: data.gender?.toLowerCase() || "",
    city: data.city || "",
    dob: data.dob ? data.dob.toISOString().split("T")[0] : "",
    creditScore: data.creditScore != null ? Number(data.creditScore) : 710, // default
    SalaryType: data.salaryType || "",
    CompanyName: data.companyName || "",
    UserPostion: data.userPosition || "",
    CompanyAddress: data.companyAddress || "",
    CompleteAddress: data.completeAddress || "",
    partner_Id: data.partnerId || "Zype5901cm78" // default partner
  };

  try {
    const response = await axios.post(ZYPE_API_URL, normalizedData, {
      headers: {
        "Authorization": "zype-12345-s7dfw4e-key",
        "Content-Type": "application/json"
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.error("Zype API error:", err.response?.data || err.message);
    return { success: false, error: err.message };
  }
}

module.exports = { pushUserToZype };
