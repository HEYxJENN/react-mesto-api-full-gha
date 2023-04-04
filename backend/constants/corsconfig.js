const corsOptions = {
  origin: "http://ohheyfront.nomoredomains.work",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

module.exports = corsOptions;
