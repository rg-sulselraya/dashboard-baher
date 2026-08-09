exports.handler = async function handler(event) {
  const gid = event?.queryStringParameters?.gid || "0";
  const url = `https://docs.google.com/spreadsheets/d/18PBKyGq0ZZx8WQclEFmrSDsWZjCj3QyxF-uSKSemz-I/export?format=csv&gid=${encodeURIComponent(gid)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Google Sheets returned ${response.status}`,
      };
    }

    return {
      statusCode: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "cache-control": "no-store",
        "access-control-allow-origin": "*",
      },
      body: await response.text(),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message || "Refresh failed",
    };
  }
};
