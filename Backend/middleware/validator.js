const { check, validationResult } = require("express-validator");


exports.registerValidator = [
  check("firstName").not().isEmpty().trim().withMessage("All fields required"),
  check("lastName").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];


exports.loginValidator = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];


exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMsg: firstError,
    });
  }
  next();
};
//ticketTitle,ticketDetails,ticketStatus,ticketType,priority

//for client login

exports.ClientloginValidator = [
  check("clientEmail").isEmail().normalizeEmail().withMessage("Invalid email-client"),
  check("clientPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];


exports.ClientvalidatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMsg: firstError,
    });
  }
  next();
};
exports.ticketValidator = [
  check("ticketTitle").not().isEmpty().trim().withMessage("All fields are required"),
  check("ticketDetails").not().isEmpty().trim().withMessage("All fields are required"),
  check("ticketStatus").not().isEmpty().trim().withMessage("All fields are required"),
  check("ticketType").not().isEmpty().trim().withMessage("All fields are required"),
  check("priority").not().isEmpty().trim().withMessage("All fields are required"),
];

exports.ticketValidatorResult = (req , res , next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();

  if(hasErrors){
    const firstError = result.array()[0].msg;
        console.log("hasErrors:" , hasErrors);
    console.log("result:" , result);
    return res.status(400).json({
      errorMessage:firstError,
    })

  }
  next();
}


//addstage validator
exports.addStageValidator = [
  check("stageName").not().isEmpty().trim().withMessage("All fields required"),
  check("stageDescription").not().isEmpty().trim().withMessage("All fields required"),
  check("startDate").trim().isDate().withMessage("Must be a valid date"),
  check("endDate").trim().isDate().withMessage("Must be a valid date"),
  check("createdDate").trim().isDate().withMessage("Must be a valid date"),
  // check("substartDate").trim().isDate().withMessage("Must be a valid date"),
  // check("subendDate").trim().isDate().withMessage("Must be a valid date"),
];

exports.notesValidator = [
  check("notesName").not().isEmpty().trim().withMessage("Please fill notes "),
];
