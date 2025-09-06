const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  validate
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate
];

// PRD validation
const validatePRD = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('problemStatement')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Problem statement must be at least 10 characters'),
  body('targetAudience')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Target audience must be at least 5 characters'),
  body('goals')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Goals must be at least 5 characters'),
  body('features')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Features must be at least 5 characters'),
  validate
];

// User Persona validation
const validateUserPersona = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Persona name must be between 2 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  validate
];

// Journey Map validation
const validateJourneyMap = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Journey title must be between 5 and 200 characters'),
  body('scenario')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Scenario must be at least 10 characters'),
  body('persona')
    .isMongoId()
    .withMessage('Valid persona ID is required'),
  validate
];

module.exports = {
  validate,
  validateUserRegistration,
  validateUserLogin,
  validatePRD,
  validateUserPersona,
  validateJourneyMap
};