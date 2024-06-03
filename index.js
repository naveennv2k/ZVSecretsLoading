const core = require('@actions/core');
const axios = require('axios');

try {
  // Get input variables
  const apiUrl = core.getInput('api_url');
  const apiToken = core.getInput('api_token');

  // Make REST API call
  axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`
    }
  })
  .then(response => {
    // Export response data as output variables
    core.setOutput('response_status', response.status);
    core.setOutput('response_data', JSON.stringify(response.data));
  })
  .catch(error => {
    core.setFailed(`Failed to make API call: ${error.message}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
