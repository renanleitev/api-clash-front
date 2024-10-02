import { useState } from 'react';
import {
  Button,
  CircularProgress,
  Typography,
  Pagination,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
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
import DeckChart from '../../components/Deck/DeckChart';
import DeckDate from '../../components/Deck/DeckDate';
import DeckStatus from '../../components/Deck/DeckStatus';
import { getBattlesData } from '../../services/axios';
import convertObjectToArray from '../../hooks/convertObjectToArray';

export default function DecksWinPercentage() {
  const defaultQuery = {
    winPercentage: 0,
    startDate: dayjs('2024-09-01'), // Para fins de consulta, definindo para o começo do mês de setembro
    endDate: dayjs('2024-09-30') // Para fins de consulta, definindo para o final do mês de setembro
  };

  const [query, setQuery] = useState(defaultQuery);

  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // Para mudar a aba
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Para mudar a página
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setTab(0);
    setPage(value);
  };

  async function getData() {
    const { winPercentage, startDate, endDate } = query;
    if (winPercentage > 100) {
      toast.error('Porcentagem acima de 100%!');
    } else {
      setIsLoading(true);
      const startTime = dayjs(startDate).toISOString();
      const endTime = dayjs(endDate).toISOString();
      const url = `decks-win-percentage?winPercentage=${winPercentage}&startTime=${startTime}&endTime=${endTime}`;
      const result = await getBattlesData(url);
      if (result?.length === 0) {
        toast.error('Não foi possível encontrar dados');
        setIsLoading(false);
      } else {
        toast.success('Dados encontrados com sucesso!');
        setData(convertObjectToArray(result));
        setIsLoading(false);
      }
    }
  }

  return (
    <VerticalContainer>
      {data?.length === 0 ? (
        <>
          <Input
            data={query}
            setData={setQuery}
            keyName="winPercentage"
            label="Porcentagem de Vitória"
            keyType="number"
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
          {data.slice(page - 1, page).map((item, index) => {
            return (
              <VerticalContainer key={index} style={{ padding: '2rem' }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Decks" />
                  <Tab label="Estatísticas" />
                </Tabs>
                {tab === 0 ? (
                  <DeckList deckList={item?.deck} />
                ) : (
                  <VerticalContainer>
                    <DeckChart
                      winPercentage={item.winPercentage}
                      lossPercentage={100 - item.winPercentage}
                    />
                    <HorizontalContainer>
                      <DeckDate
                        startDate={query.startDate}
                        endDate={query.endDate}
                      />
                      <DeckStatus
                        wins={item?.won}
                        losses={item?.played - item?.won}
                        total={item?.played}
                      />
                    </HorizontalContainer>
                  </VerticalContainer>
                )}
                <Pagination
                  count={data?.length}
                  page={page}
                  onChange={handlePageChange}
                />
              </VerticalContainer>
            );
          })}
        </Paper>
      )}
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            if (data?.length === 0) {
              getData();
            } else {
              setData([]);
              setQuery(defaultQuery);
            }
          }}
        >
          {data?.length === 0 ? 'Pesquisar' : 'Voltar'}
        </Button>
      )}
    </VerticalContainer>
  );
}
