const cityname = document.getElementById("cityname");
const submitBtn = document.getElementById("submitbtn");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp");
const temp_status = document.getElementById("temp_status");

// for dates and months

const curdate = document.getElementById("day");
const dayt = document.getElementById("today_date");
const getcurrentday = () => {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currenttime = new Date();
  return weekday[currenttime.getDay()];
};
const getcurrenttime = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var now = new Date();
  var month = months[now.getMonth()];
  var day = now.getDate();

  return `${month} ${day}`;
};
curdate.innerHTML = getcurrentday();
dayt.innerHTML = getcurrenttime();

// apicalling

const getInfo = async (event) => {
  event.preventDefault();
  let cityval = cityname.value;
  if (cityval === "") {
    city_name.innerHTML = "Plz write the name before you search";
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=aa531a674b35d4810c352bd3f0232a87`;
      const response = await fetch(url);
      const data = await response.json();
    //   console.log(data);
      const arrdata = [data];
      city_name.innerHTML = `${arrdata[0].name},${arrdata[0].sys.country}`;
      const t = parseInt(arrdata[0].main.temp) - 273;
      temp.innerHTML = `${t.toString()}°C`;

      const tempMood = arrdata[0].weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color: #a4b0be; '></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
      }
    } catch {
      city_name.innerHTML = "Plz enter the city name properly";
      temp.innerHTML = `<span >---</span>°C`;
      temp_status.innerHTML = `---`;
    }
  }
};

submitBtn.addEventListener("click", getInfo);
