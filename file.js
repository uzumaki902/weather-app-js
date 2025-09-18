document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("city-input");
  const btn = document.getElementById("button");
  const display_name = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const dec = document.getElementById("description");
  const error = document.getElementById("error-message");
  const info = document.getElementById("weather-info");
  const key = "96dd5ad0c5fc4d4c9e4113627251809";

  btn.addEventListener("click", async () => {
    let city = input.value.trim();
    if (!city) return;
    try {
      let w_data = await getdata(city);
      render(w_data);
    } catch (error) {
      showerror();
    }
  });

  async function getdata(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;
    const response = await fetch(url);
    console.log(typeof response);
    console.log(response);
    if (!response.ok) {
      throw new Error("city not found");
    }
    const data = await response.json();
    return data;
  }

  function render(data) {
    const { location, current } = data;
    display_name.innerHTML = location.name;
    temp.textContent = `${current.temp_c} celcius`;
    info.classList.remove("hidden");
    error.classList.add("hidden");
  }

  function showerror() {
    info.classList.add("hidden");
    error.classList.remove("hidden");
  }
});
