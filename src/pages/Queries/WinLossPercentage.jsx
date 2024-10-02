import { useState } from 'react';
import { Button, Typography, Paper } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PieChart } from '@mui/x-charts/PieChart';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import * as colors from '../../config/colors';
import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import Input from '../../components/Input/Input';
import { getBattlesData } from '../../services/axios';

export default function WinLossPercentage() {
  const defaultQuery = {
    card: '',
    startDate: dayjs('2024-09-01'), // Para fins de consulta, definindo para o começo do mês de setembro
    endDate: dayjs('2024-09-30') // Para fins de consulta, definindo para o final do mês de setembro
  };

  const [query, setQuery] = useState(defaultQuery);

  const [data, setData] = useState(undefined);

  async function getData() {
    const { card, startDate, endDate } = query;
    if (card === '') {
      toast.error('Card não pode ser vazio!');
    } else {
      const startTime = dayjs(startDate).toISOString();
      const endTime = dayjs(endDate).toISOString();
      const url = `win-loss-percentage?card=${card}&startTime=${startTime}&endTime=${endTime}`;
      const result = await getBattlesData(url);
      if (result?.losses === null) {
        toast.error('Não foi possível encontrar dados');
      } else {
        setData(result);
      }
    }
  }

  return (
    <VerticalContainer>
      {data === undefined ? (
        <>
          <Input
            data={query}
            setData={setQuery}
            keyName="card"
            label="Nome do Card"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <HorizontalContainer>
              <VerticalContainer>
                <Typography variant="h6">Data Inicial</Typography>
                <DateCalendar
                  value={query.startDate}
                  onChange={(newValue) =>
                    setQuery({ ...query, startDate: newValue })
                  }
                />
              </VerticalContainer>
              <VerticalContainer>
                <Typography variant="h6">Data Final</Typography>
                <DateCalendar
                  value={query.endDate}
                  onChange={(newValue) =>
                    setQuery({ ...query, endDate: newValue })
                  }
                />
              </VerticalContainer>
            </HorizontalContainer>
          </LocalizationProvider>
        </>
      ) : (
        <Paper width="100%">
          <HorizontalContainer style={{ padding: '2rem' }}>
            <VerticalContainer style={{ gap: 0 }}>
              <img src={data?.imageURL} />
              <Typography variant="h6">{data?.name}</Typography>
            </VerticalContainer>
            <VerticalContainer>
              <PieChart
                // https://mui.com/x/react-charts/pie/
                series={[
                  {
                    arcLabel: (item) =>
                      `${Number.parseFloat(item.value).toFixed(2)}%`,
                    data: [
                      {
                        id: 0,
                        value: data?.winPercentage,
                        label: '% Vitórias',
                        color: colors.sucessColor
                      },
                      {
                        id: 1,
                        value: data?.lossPercentage,
                        label: '% Derrotas',
                        color: colors.dangerColor
                      }
                    ]
                  }
                ]}
                width={400}
                height={200}
              />
              <HorizontalContainer>
                <VerticalContainer style={{ width: '50%' }}>
                  <Typography variant="h6">
                    Data Inicial: {dayjs(query.startDate).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography variant="h6">
                    Data Final: {dayjs(query.endDate).format('DD/MM/YYYY')}
                  </Typography>
                </VerticalContainer>
                <VerticalContainer style={{ alignItems: 'flex-start' }}>
                  <Typography variant="h6">Vitórias: {data?.wins}</Typography>
                  <Typography variant="h6">Derrotas: {data?.losses}</Typography>
                  <Typography variant="h6">
                    Batalhas: {data?.totalBattles}
                  </Typography>
                </VerticalContainer>
              </HorizontalContainer>
            </VerticalContainer>
          </HorizontalContainer>
        </Paper>
      )}
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          if (data === undefined) {
            getData();
          } else {
            setData(undefined);
            setQuery(defaultQuery);
          }
        }}
      >
        {data === undefined ? 'Pesquisar' : 'Voltar'}
      </Button>
    </VerticalContainer>
  );
}
