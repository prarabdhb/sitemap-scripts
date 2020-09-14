const path = require("path");
const fs = require("fs");
const { ROUTES, BASE_URL } = require("./constants");

const allStaticPaths = [
	{
		loc: ROUTES.ROOT_ROUTE,
		changefreq: "weekly",
		priority: 1.0
	},
	{
		loc: ROUTES.REFERRAL_ROUTE,
		changefreq: "monthly",
		priority: 0.8
	},
	{
		loc: ROUTES.DOWNLOAD_ROUTE,
		changefreq: "monthly",
		priority: 0.7
	},
	{
		loc: ROUTES.HOW_TO_PLAY_ROUTE,
		changefreq: "monthly",
		priority: 0.5
	},
	{
		loc: ROUTES.LOGIN_ROUTE,
		changefreq: "monthly",
		priority: 0.8
	},
	{
		loc: ROUTES.PRIVACY_ROUTE,
		changefreq: "monthly",
		priority: 0.5
	},
	{
		loc: ROUTES.PROFILE_ROUTE,
		changefreq: "monthly",
		priority: 0.8
	},
	{
		loc: ROUTES.RULES_ROUTE,
		changefreq: "monthly",
		priority: 0.5
	},
	{
		loc: ROUTES.TERMS_ROUTE,
		changefreq: "monthly",
		priority: 0.5
	}
];

let sitemapContents = "";
let timeLastMod = new Date().toISOString();

allStaticPaths.forEach(path => {
	sitemapContents += `
	<url>
		<loc>${BASE_URL}${path.loc}</loc>
		<lastmod>${timeLastMod}</lastmod>
		<changefreq>${path.changefreq}</changefreq>
		<priority>${path.priority}</priority>
	</url>`;
});

sitemapContents = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapContents}
</urlset>`;

let sitemapDir = "./sitemaps/";
let fileName = "static-sitemap.xml";

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
