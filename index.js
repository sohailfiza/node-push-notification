const express = require("express");
const webpush = require("web-push");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(express.json());

const publicVapidKey =
  "BI4DxnZvaeA7zo2e_2SusVVZ8BMTPF9g9sSfeVA2H-ZGVZ_B5kwk2nqDto_8ZvVNzzMXOZ-0PvnjwflSd0uD2jY";
const privateVapidKey = "RThK6dIwa4DtnRjMMBmERhJ3oLPUq_FKB872ZPHcMXc";

webpush.setVapidDetails(
  "mailto: <uct8417uun@tidissajiiu.com>",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Notification Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

const port = 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));