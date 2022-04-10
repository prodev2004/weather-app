// Subscribe ==> ALB Dev
const input = document.querySelector('.search-input input')
const button = document.querySelector('.search-input button')
const card = document.querySelector('.card')
const search_results_el = document.querySelector('.search-results')

const API_KEY = `b78794a533744a2daaa63809221903`

async function get_city (city) {
    const resp = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    const respData = await resp.json()
    
    return respData
}

get_searched_city('New York')
async function get_searched_city (city) {
    const resp = await fetch(`http://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${city}`)
    const respData = await resp.json()
    
    return respData
}

button.addEventListener('click', async () => {
    const input_value = input.value;
    const cities = await get_searched_city(input_value)

    search_results_el.innerHTML = cities.map(city => {
        return `
            <div class="single-2" data-name="${city.name}">
                <h2>${city.name}, ${city.country}</h2>
            </div>
        `
    }).join('')
    const search_results_items = document.querySelectorAll('.single-2')
    search_results_items.forEach(item => {
        item.addEventListener('click', async () => {
            const city_name = await get_city(item.dataset.name)
            add_to_dom(city_name.location.name)
        })
    })
})

add_to_dom('Berlin')
async function add_to_dom (city_name) {
    const city = await get_city(city_name)

    card.innerHTML = `
            <div class="top">
                <h2>${city.location.name}, ${city.location.country}</h2>
                <img src="${city.current.condition.icon}" alt="">
                <p class="small-desc">${city.current.condition.text}</p>
                <h3>
                    <span class="temp-c">${city.current.temp_c}</span>°C -
                    <span class="temp-f">${city.current.temp_f}</span>F
                </h3>
            </div>
            <div class="time">
                <p class="local-time">
                    Local Time: <span class="local-time-span">${city.location.localtime}</span>
                </p>
                <p class="last-updated">
                    Last Updated<span class="last-updated-span">: ${city.current.last_updated}</span>
                </p>
            </div>
            <div class="other-info-container">
                <div class="other-info">
                    <div class="single">
                        <p class="single-title">Wind mph/kph</p>
                        <h3>
                            <span class="wind-mph">${city.current.wind_mph}</span> /
                            <span class="wind-kph">${city.current.wind_kph}</span>
                        </h3>
                    </div>
                    <div class="single">
                        <p class="single-title">Wind Direction</p>
                        <h3 class="wind-dir">${city.current.wind_dir}</h3>
                    </div>
                    <div class="single">
                        <p class="single-title">Cloud</p>
                        <h3 class="cloud">${city.current.cloud}</h3>
                    </div>
                    <div class="single">
                        <p class="single-title">Humidity</p>
                        <h3 class="cloud">${city.current.humidity}</h3>
                    </div>
                </div>
            </div>
    `
}