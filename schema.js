const {
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const CoordType = new GraphQLObjectType({
  name: "Coord",
  fields: () => ({
    lon: { type: GraphQLFloat },
    lat: { type: GraphQLFloat },
  }),
});

const WeatherType = new GraphQLObjectType({
  name: "Weather",
  fields: () => ({
    main: { type: GraphQLString },
    description: { type: GraphQLString },
  }),
});

const MainType = new GraphQLObjectType({
  name: "Main",
  fields: () => ({
    temp: { type: GraphQLFloat },
    pressure: { type: GraphQLFloat },
    humidity: { type: GraphQLFloat },
  }),
});

const OpenWeatherMapType = new GraphQLObjectType({
  name: "OpenWeatherMap",
  fields: () => ({
    coord: { type: CoordType },
    weather: { type: new GraphQLList(WeatherType) },
    main: { type: MainType },
    id: { type: GraphQLInt },
    name: { type: GraphQLString }, // City Name
  }),
});

// Root Query

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    weatherByCity: {
      type: OpenWeatherMapType,
      args: {
        //argument to search the Weather by cityName
        cityName: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${args.cityName}&appid=${process.env.weatherAPIKEY}`
          )
          .then((res) => res.data);
      },
    },
    weatherByCoord: {
      type: OpenWeatherMapType,
      args: {
        //argument to search the Weather by coordinates
        lon: {
          type: GraphQLFloat,
        },
        lat: {
          type: GraphQLFloat,
        },
      },
      resolve(parent, args) {
        return axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${args.lat}&lon=${args.lon}&appid=${process.env.weatherAPIKEY}`
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
