const loggingMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  // Log request details
  console.log('\n🚀 REQUEST:', {
    method: req.method,
    url: req.url,
    headers: {
      'user-agent': req.headers['user-agent'],
      'authorization': req.headers.authorization ? 'Bearer ***' : 'None',
      'content-type': req.headers['content-type']
    },
    // body: req.method !== 'GET' ? req.body : undefined,
    timestamp: new Date().toISOString()
  });

  // Capture original res.json
  const originalJson = res.json;
  
  res.json = function(data) {
    const duration = Date.now() - startTime;
    
    // Log response details
    console.log('✅ RESPONSE:', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      responseSize: JSON.stringify(data).length + ' bytes',
      timestamp: new Date().toISOString()
    });
    
    return originalJson.call(this, data);
  };

  next();
};

module.exports = loggingMiddleware;