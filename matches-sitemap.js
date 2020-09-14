const path = require("path");
const fs = require("fs");
const { getAllSports, getAllMatches } = require("./requests");

(async () => {
	const allSportPaths = await getAllSports();

	allSportPaths.forEach(async sport => {
		if ((sport.sportName || "").toLowerCase() !== "quiz") {
			const matchesData = await getAllMatches(sport.sportId);
			let sitemapContents = "";
			let timeLastMod = new Date().toISOString();
			if (matchesData.length > 0) {
				matchesData.forEach(path => {
					sitemapContents += `
                    <url>
                        <loc>${path.loc}</loc>
                        <lastmod>${timeLastMod}</lastmod>
                        <changefreq>${path.changefreq}</changefreq>
                        <priority>${path.priority}</priority>
                    </url>`;
				});

				sitemapContents = `<?xml version="1.0" encoding="utf-8"?>
                    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapContents}
                    </urlset>`;

				let sitemapDir = "./sitemaps/";
				let fileName = `${sport.sportName}-sitemap.xml`;

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
			}
		}
	});
})();
