export async function fetchData(url, options = {}) {
  try {
    // Make sure the body is passed directly without re-stringifying
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: options.headers || {
        "Content-Type": "application/json",
      },
      body: options.body || null, // No need to stringify again
    });

    // Check for non-2xx responses
    if (!response.ok) {
      throw new Error(
        `There was an error: ${response.statusText} (Status code: ${response.status})`
      );
    }

    // Handle 204 No Content specifically
    if (response.status === 204) {
      return null; // No content, but the operation was successful
    }

    // Parse JSON responses if they exist
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // For non-JSON responses, return status text
    return response.statusText;
  } catch (error) {
    console.log("Error fetching data:", error.message);
    throw error; // Re-throw error to handle in the calling function
  }
}
