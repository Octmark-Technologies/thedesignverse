import puppeteer from 'puppeteer';

const BASE_URL = 'http://localhost:5173';
const ROUTES = [
  '/',
  '/b2c/residential-interiors',
  '/b2c/commercial-hubs',
  '/b2c/office-spaces',
  '/interior/craftsmanship',
  '/interior/design-process',
  '/interior/portfolio',
  '/interior/modular-excellence',
  '/b2b',
  '/b2b/interior-designers',
  '/b2b/vendors',
  '/b2b/architects',
  '/b2b/coworking-spaces',
  '/b2b/manufacturing-support',
  '/b2b/material-library',
  '/projects',
  '/experience-centre',
  '/lp',
  '/coworking',
  '/lp/thank-you'
];

async function runTests() {
  console.log(`Starting automated website crawl on ${BASE_URL}...`);
  console.log(`Checking ${ROUTES.length} routes.\n`);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const report = {};

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`\nTesting: ${url}`);
    
    const pageIssues = {
      errors: [],
      brokenImages: [],
      brokenLinks: []
    };

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        pageIssues.errors.push(`Console Error: ${msg.text()}`);
      }
    });

    page.on('pageerror', err => {
      pageIssues.errors.push(`Uncaught Exception: ${err.toString()}`);
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Check for Vite error overlay
      const hasViteError = await page.evaluate(() => {
        return !!document.querySelector('vite-error-overlay');
      });
      if (hasViteError) {
        pageIssues.errors.push('CRITICAL: Vite error overlay detected on page.');
      }

      // Check broken images
      const brokenImgs = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src || img.alt || 'unknown image');
      });
      if (brokenImgs.length > 0) {
        pageIssues.brokenImages = brokenImgs;
      }

      // Check broken links
      const brokenAnchorTags = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        return links
          .filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#')
          .map(a => a.innerText || a.className || 'empty link');
      });
      if (brokenAnchorTags.length > 0) {
        pageIssues.brokenLinks = brokenAnchorTags;
      }

    } catch (e) {
      pageIssues.errors.push(`Navigation/Execution Failed: ${e.message}`);
    }

    report[route] = pageIssues;
    
    // Log findings for this page
    const totalIssues = pageIssues.errors.length + pageIssues.brokenImages.length + pageIssues.brokenLinks.length;
    if (totalIssues === 0) {
      console.log('✅ PASS: No obvious bugs detected.');
    } else {
      console.log(`❌ FAIL: Found ${totalIssues} issue(s).`);
      if (pageIssues.errors.length) console.log('  Errors:', pageIssues.errors);
      if (pageIssues.brokenImages.length) console.log('  Broken Images:', pageIssues.brokenImages.length);
      if (pageIssues.brokenLinks.length) console.log('  Broken/Empty Links:', pageIssues.brokenLinks.length);
    }
  }

  await browser.close();

  console.log('\n======================================');
  console.log('TEST RUN COMPLETE');
  console.log('======================================');
  
  let totalErrors = 0;
  for (const route in report) {
    const issues = report[route];
    if (issues.errors.length > 0 || issues.brokenImages.length > 0) {
      totalErrors++;
    }
  }
  
  if (totalErrors === 0) {
    console.log('🎉 All routes passed without errors or broken images!');
  } else {
    console.log(`⚠️  Found issues on ${totalErrors} out of ${ROUTES.length} routes.`);
  }
}

runTests().catch(console.error);
