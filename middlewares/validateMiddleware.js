const validate = (schema) => {
  return (req, res, next) => {
    console.log('Validation middleware triggered'); // Debug log
    
    // Validate request body against schema
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false, // Return all errors not just the first one
      stripUnknown: true // Remove unknown properties
    });

    if (error) {
      console.log('Validation errors:', error.details); // Debug log
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => ({
          field: detail.path[0],
          message: detail.message
        }))
      });
    }

    // Replace body with validated value (with unknown fields stripped)
    req.body = value;
    next();
  };
};

module.exports = validate;