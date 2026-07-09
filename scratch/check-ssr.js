import axios from "axios";

async function main() {
  try {
    const res = await axios.get("http://localhost:3000/courses/html-principiante");
    console.log("HTML length:", res.data.length);
    
    // Check if the button or its text exists in the SSR HTML
    const hasButtonText = res.data.includes("Inscribirse ahora (Gratis)");
    console.log("Has button text in SSR:", hasButtonText);
    
    // Search for button tags
    const buttonMatches = res.data.match(/<button[^>]*>([\s\S]*?)<\/button>/gi);
    console.log("Found buttons in SSR:", buttonMatches);
  } catch (error) {
    console.error("Error fetching SSR:", error.message);
  }
}

main();
