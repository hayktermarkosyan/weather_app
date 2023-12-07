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
  weatherData: IWeatherData | undefined;
}

const WeatherTable = ({ city, country, weatherData }: WeatherTableProps) => {
  return (
    <Box w={"100%"} textAlign={"center"}>
      <Heading>
        {city}, {country}
      </Heading>
      <Heading mt={"2%"} fontSize={"medium"}>
        Current Weather
      </Heading>
      <TableContainer
        mt={"2%"}
        ml={{ base: "0", md: "25%" }}
        w={{ base: "100%", md: "50%" }}
      >
        <Table size="sm">
          <Thead>
            <Tr>
              <Th px="2px">Temperature</Th>
              <Th px="2px">Wind speed</Th>
              <Th px="2px">Humidity</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px="2px">{weatherData?.temp}</Td>
              <Td px="2px">{weatherData?.windSpeed}</Td>
              <Td px="2px">{weatherData?.humidity}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WeatherTable;
