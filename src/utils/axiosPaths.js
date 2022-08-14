export const getAllGamesOptions = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: { platform: 'all', 'sort-by': 'release-date' },
    headers: {
        'X-RapidAPI-Key': '09fd63799amsh2a9669f12442c07p113242jsn8e195afa1988',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

export const gameByCategory = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: { category: 'shooter' },
    headers: {
        'X-RapidAPI-Key': '09fd63799amsh2a9669f12442c07p113242jsn8e195afa1988',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};
