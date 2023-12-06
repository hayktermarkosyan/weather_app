import React, { useEffect, useState } from "react";
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

interface WeatherTableProps {
  forecastData: IForecastData[];
}

const timePeriods = [
  "00:00:00",
  "03:00:00",
  "06:00:00",
  "09:00:00",
  "12:00:00",
  "15:00:00",
  "18:00:00",
  "21:00:00",
];

const ForecastTable = ({ forecastData }: WeatherTableProps) => {
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    setDates([]);
    forecastData?.map((forecast, index) => {
      if (forecast.date !== forecastData[index - 1]?.date) {
        setDates((prevState: string[]) => {
          return [...prevState, forecast.date];
        });
      }
      return null;
    });
  }, [forecastData]);
  return (
    <Box ml={"10%"} w={"70%"}>
      <Heading mt={"2%"} fontSize={"medium"}>
        5 day forecast
      </Heading>
      <TableContainer mt={"2%"} w={"100%"}>
        <Table size={"sm"}>
          <Thead>
            <Tr>
              <Th>Date / Time</Th>
              {timePeriods.map((period, i) => (
                <Th key={i}>{period}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {dates.map((date, index) => {
              return (
                <Tr key={index}>
                  <Td>{date}</Td>
                  {timePeriods.map((period, i) => {
                    const element = forecastData.filter(
                      (forecast) =>
                        forecast.time === period && forecast.date === date
                    )[0];

                    if (element) {
                      return <Td key={i}>{element.temp}</Td>;
                    } else {
                      return <Td key={i}>-</Td>;
                    }
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ForecastTable;
