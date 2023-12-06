import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

interface WeatherTableProps {
  city: string;
  country: string;
  weatherData: IWeatherData;
}

const WeatherTable = ({ city, country, weatherData }: WeatherTableProps) => {
  return (
    <Box ml={"10%"} w={"70%"}>
      <Heading>
        {city}, {country}
      </Heading>
      <Heading mt={"2%"} fontSize={"medium"}>
        Current Weather
      </Heading>
      <TableContainer mt={"2%"} w={"50%"}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Temperature</Th>
              <Th>Wind speed</Th>
              <Th>Humidity</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{weatherData?.temp}</Td>
              <Td>{weatherData?.windSpeed}</Td>
              <Td>{weatherData?.humidity}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeatherTable;
