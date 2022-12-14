const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(
  "C:",
  "Users",
  "David",
  "Downloads",
  "Programming",
  "wildcodeSchool_project",
  "server",
);


const errorHandler = (err, req, res, next) => {
  console.error(err);
  let errStatus, errMsg;
  switch (err.statusCode) {
    case 500:
      errStatus = 500;
      errMsg = err.message || "Erreur interne du serveur";
      break;
    case 502:
      errStatus = 502;
      errMsg = err.message || "Bad Gateway";
      break;
    case 503:
      errStatus = 503;
      errMsg = err.message || "Service indisponible";
      break;
    case 504:
      errStatus = 504;
      errMsg = err.message || "Temps d'attente écoulé";
      break;
    default:
      errStatus = 500;
      errMsg = err.message || "Erreur interne du serveur";
      break;
  }
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: err ? errMsg : "Le serveur ne réponds pas",
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
  fs.ensureDir(path.dirname(filePath))
    .then(() => {
      fs.outputFile("Error.txt", err.stack)
        .then(() => {
          console.log("Les traces de stack est écrt au fichier Error.txt");
        })
        .catch((err) => {
          console.error(
            "Impossible d'écrire, il y a une erreur dans le fichier error.txt",
            err
          );
        });
    })
    .catch((error) => {
      console.error("Impossible de trouver l'emplacement exact", error);
    });
};
module.exports = errorHandler;
