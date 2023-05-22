"use client";

import Image from "next/image";
import day from "../public/assets/icons/10d@2x.png";
import { useState } from "react";
 

export const Feed = () => {
  const [weather, setWeather] = useState("");
  const [location, setLocation] = useState("");

  const getWeather = async (e) => {
    e.preventDefault();
    const apiKey = "53ae80f783d0b764a5e8fa7db72a3ad2";

    if (location) {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );
        const data = await res.json();

        if (data.cod === "404") {
          //Error handling 404 not found
          setWeather(
             <p className="text-red-500 tex-sm">
              Please enter correct location
              </p>
            )
          return;
        }

        if (data) {
          const apiData = {
            country: data.sys.country,
            city: data.name,
            img: data.weather[0].icon,
            temp: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            desc: data.weather[0].description,
          };
          console.log(data);
          setWeather(
            <>
              <div className="text-center text-2xl p-2 font-semibold">
                {apiData.city}
              </div>
              <div className="flex text-center ">
                <Image alt="day" src={day} width={90} height={70} />
                <div className="text-6xl pl-4 text-white font-satoshi">
                  {apiData.temp}°C
                </div>
              </div>
              <div className="text-center font-satoshi text-white">
                Huimidity: {apiData.humidity} %
              </div>
              <div className="text-center font-satoshi text-white">
                Wind: {apiData.wind}
              </div>
              <div className="text-center font-satoshi text-white">
                Description: {apiData.desc}
              </div>
              <div className="text-center font-satoshi text-white">
                Sunrise: {new Date(apiData.sunrise * 1000).toDateString()}
              </div>
              <div className="text-center font-satoshi text-white">
                Sunset: {new Date(apiData.sunset * 1000).toDateString()}
              </div>
            </>
          );
          setLocation("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="feed">
      <form className="glassmorphism">
        <div className="flex">
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            placeholder="Location (ie. London)"
            className="search_input"
          />
          <button className="black_btn" onClick={getWeather}>
            Search
          </button>
        </div>
        {weather && <div>{weather}</div>}
      </form>
    </section>
  );
};

export default Feed;
