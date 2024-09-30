import { useEffect, useState, useMemo } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination
} from '@mui/material';
import { VerticalContainer } from '../../config/GlobalStyle';
import { getPlayersData } from '../../services/axios';
import LoadingProgress from '../../components/Loading/LoadingProgress';

export default function BattlesPage() {
  const [battlesData, setBattlesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Para procurar todos as batalhas ao carregar a página
  const fetchAllBattlesData = async () => {
    setIsLoading(true);
    const responseBattles = await getPlayersData('battles/all-battles');
    setBattlesData(responseBattles);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllBattlesData();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleBattles = useMemo(
    () =>
      [...battlesData].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [battlesData, page, rowsPerPage]
  );

  return (
    <VerticalContainer style={{ padding: '4rem' }}>
      {isLoading ? (
        <LoadingProgress />
      ) : (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Jogador 1 (J1)</TableCell>
                  <TableCell>Jogador 2 (J2)</TableCell>
                  <TableCell>TD J1</TableCell>
                  <TableCell>TD J2</TableCell>
                  <TableCell>Deck J1</TableCell>
                  <TableCell>Deck J2</TableCell>
                  <TableCell>Vencedor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleBattles.map((battle) => (
                  <TableRow
                    key={battle._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{battle.player1}</TableCell>
                    <TableCell>{battle.player2}</TableCell>
                    <TableCell>{battle.player1TowersDestroyed}</TableCell>
                    <TableCell>{battle.player2TowersDestroyed}</TableCell>
                    {/* TODO: Add links to decks page */}
                    <TableCell>Deck J1</TableCell>
                    <TableCell>Deck J2</TableCell>
                    <TableCell>
                      {battle.winner === 'player1'
                        ? battle.player1
                        : battle.player2}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component={Paper}
            count={battlesData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </VerticalContainer>
  );
}
