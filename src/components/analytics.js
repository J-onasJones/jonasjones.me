// Function to record the request with analytics
  export async function recordRequest() {

    const analyticsData = {
      timestamp: Date.now(),
      domain: window.location.hostname,
      method: 'GET', // Assuming the request method is GET; adjust as necessary
      path: window.location.pathname,
    };

    console.log('Recording request:', analyticsData);

    const ANALYTICS_URL = 'https://analytics.jonasjones.dev/requests/record/ipunknown';
    const ANALYTICS_API_KEY = import.meta.env.VITE_ANALYTICS_API_KEY;

    try {
      const response = await fetch(ANALYTICS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ANALYTICS_API_KEY,
        },
        body: JSON.stringify(analyticsData),
      });

      if (response.ok) {
        console.log('Request recorded successfully');
      } else {
        console.error('Failed to record request:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error recording request:', error);
    }
  }
