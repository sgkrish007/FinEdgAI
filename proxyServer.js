const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use("/data_processing", async (req, res) => {
//   const url = `http://65.2.162.222:5000${req.url}`;
//   try {
//     console.log(`Forwarding request to: ${url}`);
//     const response = await axios({
//       method: req.method,
//       url: url,
//       data: req.body,
//       params: req.query,
//       headers: { ...req.headers, host: undefined },
//       timeout: 60000,
//     });
//     console.log("Response status:", response.status);
//     res.status(response.status).send(response.data);
//   } catch (error) {
//     console.error("Error from backend:", error);
//     if (error.code === "ECONNABORTED") {
//       res.status(504).send("Request timed out");
//     } else {
//       res
//         .status(error.response ? error.response.status : 500)
//         .send(error.message);
//     }
//   }
// });
app.post('/data_processing', async (req, res) => {
  const url = `http://65.2.162.222:5000${req.url}`;
  try {
    console.log(`Forwarding request to: ${url}`);
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      params: req.query,
      headers: { ...req.headers, host: undefined },
      timeout: 60000,
    });
    console.log("Request.boday", req.body);
    console.log("Response status:", response.status);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Error from backend:", error);
    if (error.code === "ECONNABORTED") {
      res.status(504).send("Request timed out");
    } else {
      res
        .status(error.response ? error.response.status : 500)
        .send(error.message);
    }
  }
});
  
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
