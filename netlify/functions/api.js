export async function handler(event) {
  try {
    const targetUrl =
      process.env.API_URL +
      event.path.replace(/^\/.netlify\/functions\/api/, "");

    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: ["POST", "PUT", "PATCH"].includes(event.httpMethod)
        ? event.body
        : undefined,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
