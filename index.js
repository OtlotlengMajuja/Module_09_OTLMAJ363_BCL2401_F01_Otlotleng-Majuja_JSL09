// Fetching randomly generated images from Unsplash
try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    // Added an author to the bottom left corner of the web page
    document.getElementById("author").textContent = `By: ${data.user.name}`;
} catch (err) {
    // Use a default background image/author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080)`
    document.getElementById("author").textContent = `By: Otlotleng Majuja`;
}
// Fetching the cryptocurrency from the CoinGecko API
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    // Added the icon for the cryptocurrency 
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
        `
    // Added the current, high, and low market price
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
        `
} catch (err) {
    console.error(err)
}
// Inserted a function to show the current time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)
// Fetched the data for the current location/position to appear in the top right corner of the webpage
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw new Error("Weather data not available")
        }
        const data = await res.json()
        // Included the icon for the weather, temparature, and city data to appear
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
                `
    } catch (err) {
        console.error(err)
    }
});
