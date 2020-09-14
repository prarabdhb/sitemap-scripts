const path = require("path");
const fs = require("fs");
const { getAllSports } = require("./requests");
const { BASE_URL, ROUTES } = require("./constants");

(async () => {
	const allSportPaths = await getAllSports();

	let sitemapContents = "";
	let timeLastMod = new Date().toISOString();

	allSportPaths.forEach(path => {
		sitemapContents += `
	<url>
		<loc>${BASE_URL}${ROUTES.SPORT_ROUTE}${path.sportName}</loc>
		<lastmod>${timeLastMod}</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.8</priority>
	</url>`;
	});

	sitemapContents = `<?xml version="1.0" encoding="utf-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapContents}
    </urlset>`;

	let sitemapDir = "./sitemaps/";
	let fileName = "sports-sitemap.xml";

	let outputFile = path.resolve(sitemapDir, fileName);

	if (!fs.existsSync(sitemapDir)) {
		fs.mkdirSync(sitemapDir);
	}

	fs.writeFile(outputFile, sitemapContents, err => {
		if (err) {
			console.log(err);
		}

		console.log(`The file ${outputFile} was created!`);
	});
})();
