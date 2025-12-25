const puppeteer = require('puppeteer');

async function testLogin() {
  console.log('🚀 Démarrage du test de connexion...');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = await browser.newPage();

    console.log('📱 Navigation vers http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

    console.log('🔍 Recherche du lien de connexion...');
    const loginLink = await page.$('a[href="/login"]');
    if (loginLink) {
      console.log('✅ Lien de connexion trouvé, clic...');
      await loginLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
    } else {
      console.log('❌ Lien de connexion non trouvé, vérification de l\'URL actuelle...');
      const currentUrl = page.url();
      if (!currentUrl.includes('/login')) {
        console.log('🔄 Navigation directe vers /login...');
        await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2' });
      }
    }

    console.log('📝 Remplissage du formulaire de connexion...');
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    await page.type('input[type="email"]', 'admin@aspc-ci.org');

    await page.waitForSelector('input[type="password"]', { timeout: 5000 });
    await page.type('input[type="password"]', 'Admin123!');

    console.log('🔐 Clic sur le bouton de connexion...');
    const loginButton = await page.$('button[type="submit"]');
    if (loginButton) {
      await loginButton.click();
    } else {
      // Essayer de trouver un bouton avec du texte
      const buttons = await page.$$('button');
      for (const button of buttons) {
        const text = await page.evaluate(el => el.textContent, button);
        if (text && text.toLowerCase().includes('connexion')) {
          await button.click();
          break;
        }
      }
    }

    console.log('⏳ Attente de la redirection...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

    const finalUrl = page.url();
    console.log('🏁 URL finale:', finalUrl);

    if (finalUrl.includes('/admin') || finalUrl.includes('/dashboard')) {
      console.log('✅ Connexion réussie !');
    } else {
      console.log('❌ Connexion échouée ou redirection inattendue');
    }

    // Attendre un peu pour voir le résultat
    await page.waitForTimeout(3000);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  } finally {
    console.log('🔚 Fermeture du navigateur...');
    await browser.close();
  }
}

testLogin().catch(console.error);