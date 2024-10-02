import { useState } from 'react';
import { Button, CircularProgress, Typography, Paper } from '@mui/material';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import {
  VerticalContainer,
  HorizontalContainer
} from '../../config/GlobalStyle';
import Input from '../../components/Input/Input';
import DeckList from '../../components/Deck/DeckList';
import DeckDate from '../../components/Deck/DeckDate';
import { getBattlesData } from '../../services/axios';

export default function DefeatsByCardCombo() {
  const defaultQuery = {
    combo: '',
    startDate: dayjs('2024-09-01'), // Para fins de consulta, definindo para o começo do mês de setembro
    endDate: dayjs('2024-09-30') // Para fins de consulta, definindo para o final do mês de setembro
  };

  const [query, setQuery] = useState(defaultQuery);

  const [data, setData] = useState(undefined);

  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const { combo, startDate, endDate } = query;
    if (combo === '') {
      toast.error('Combo não pode ser vazio!');
    } else {
      setIsLoading(true);
      const startTime = dayjs(startDate).toISOString();
      const endTime = dayjs(endDate).toISOString();
      // Arrows, Bats, Goblin Gang, Miner, Mortar, Skeleton Dragons, Skeleton King, The Log
      const url = `defeats-by-card-combo?cardCombo=${combo}&startTime=${startTime}&endTime=${endTime}`;
      const result = await getBattlesData(url);
      console.log(result);
      setData(result);
      if (result?.defeats === undefined) {
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
            keyName="combo"
            label="Combo de Cartas"
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
          <VerticalContainer style={{ padding: '2rem' }}>
            <VerticalContainer>
              <DeckList deckList={data?.deck} />
              <HorizontalContainer>
                <DeckDate startDate={query.startDate} endDate={query.endDate} />
                <Typography variant="h6">Derrotas: {data?.defeats}</Typography>
              </HorizontalContainer>
            </VerticalContainer>
          </VerticalContainer>
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
