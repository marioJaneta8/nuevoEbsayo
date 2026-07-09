import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto("http://localhost:3000/courses/html-principiante");
    await page.waitForTimeout(2000); // wait for load
    
    // Find the button
    const button = page.locator('button:has-text("Inscribirse ahora (Gratis)")').first();
    const count = await button.count();
    console.log("Button count:", count);
    
    if (count > 0) {
      const box = await button.boundingBox();
      console.log("Button Bounding Box:", box);
      
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          visibility: computed.visibility,
          opacity: computed.opacity,
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          width: computed.width,
          height: computed.height,
          padding: computed.padding,
          border: computed.border,
          boxSizing: computed.boxSizing,
        };
      });
      console.log("Button Computed Styles:", styles);
    } else {
      console.log("Button not found on page.");
    }
  } catch (error) {
    console.error("Error checking button styles:", error);
  } finally {
    await browser.close();
  }
}

main();
