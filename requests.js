const fetch = require("node-fetch");
const { BASE_URL, ROUTES } = require("./constants");
const getAllSports = async () => {
	let sportPaths = [];

	const res = await fetch(
		"https://api-gateway.staging.jeet11.com/gaming-service/external/v1.0.0/getSports",
		{
			body: null,
			method: "GET",
			mode: "cors"
		}
	);

	if (!res.ok) {
		return sportPaths;
	}

	const response = await res.json();

	const { data, status } = response;

	if (status === "success") {
		sportPaths = data.map(sport => {
			const { name, id, priority } = sport;
			return {
				sportName: name,
				sportId: id,
				priority: priority
			};
		});
	}
	return sportPaths;
};

const getAllMatches = async sportId => {
	let matchData = [];

	const res = await fetch(
		`https://api-gateway.staging.jeet11.com/gaming-service/external/v1.0.0/getMatches?s=${sportId}`,
		{
			body: null,
			method: "GET",
			mode: "cors"
		}
	);

	if (!res.ok) {
		return sportPaths;
	}

	const response = await res.json();
	const { matchInfo } = response;
	matchData = matchInfo.map(match => {
		return {
			loc: `${BASE_URL}${ROUTES.MATCH_ROUTE}/${match.matchId}/1`,
			changefreq: "daily",
			priority: 0.8
		};
	});
	return matchData;
};

const letGoogleKnow = async sitemapUrl => {
	let encoded_file_url = encodeURIComponent(file_url);
	let ping_url = `http://www.google.com/ping?sitemap=${encoded_file_url}`;

	const res = await fetch(ping_url, {
		body: null,
		method: "GET",
		mode: "cors"
	});

	if (!res.ok) {
		console.log("Letting Google Know Failed");
	}
	console.log("Letting Google Know Succeeded");
};

module.exports = {
	getAllSports,
	getAllMatches,
	letGoogleKnow
};
