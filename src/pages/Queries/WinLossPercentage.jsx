import { useState } from 'react';
import { Button, Typography, Paper, CircularProgress } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import Input from '../../components/Input/Input';
import DeckChart from '../../components/Deck/DeckChart';
import DeckDate from '../../components/Deck/DeckDate';
import DeckStatus from '../../components/Deck/DeckStatus';
import { getBattlesData } from '../../services/axios';

export default function WinLossPercentage() {
  const defaultQuery = {
    card: '',
    startDate: dayjs('2024-09-01'), // Para fins de consulta, definindo para o começo do mês de setembro
    endDate: dayjs('2024-09-30') // Para fins de consulta, definindo para o final do mês de setembro
  };

  const [query, setQuery] = useState(defaultQuery);

  const [data, setData] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const { card, startDate, endDate } = query;
    if (card === '') {
      toast.error('Card não pode ser vazio!');
    } else {
      setIsLoading(true);
      const startTime = dayjs(startDate).toISOString();
      const endTime = dayjs(endDate).toISOString();
      const url = `win-loss-percentage?card=${card}&startTime=${startTime}&endTime=${endTime}`;
      const result = await getBattlesData(url);
      if (result?.losses === null) {
        toast.error('Não foi possível encontrar dados');
        setIsLoading(false);
      } else {
        toast.success('Dados encontrados com sucesso!');
        setData(result);
        setIsLoading(false);
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
              <DeckChart
                winPercentage={data?.winPercentage}
                lossPercentage={data?.lossPercentage}
              />
              <HorizontalContainer>
                <DeckDate startDate={query.startDate} endDate={query.endDate} />
                <DeckStatus
                  wins={data?.wins}
                  losses={data?.losses}
                  total={data?.totalBattles}
                />
              </HorizontalContainer>
            </VerticalContainer>
          </HorizontalContainer>
        </Paper>
      )}
      {isLoading ? (
        <CircularProgress />
      ) : (
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
      )}
    </VerticalContainer>
  );
}
