import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';


export default function Orders({gameData}) {


    return (
        <React.Fragment>

        <Table size="small">
            <TableHead>
                <TableRow className='font-bold'>
                    <TableCell><strong>Fecha</strong></TableCell>
                    <TableCell><strong>Rival</strong></TableCell>
                    <TableCell><strong>Puntos</strong></TableCell>
                    <TableCell><strong>Rebotes</strong></TableCell>
                    <TableCell><strong>Asitencias</strong></TableCell>
                    <TableCell><strong>Robos</strong></TableCell>
                    <TableCell><strong>Tapones</strong></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
            {gameData.map((game) => (
                <TableRow key={game.id}>
                    <TableCell>{format(new Date(game.game.match_date), "EEE. dd/MM", { locale: es })}</TableCell>
                    <TableCell>{game.rival_team}</TableCell>
                    <TableCell className='text-center'>{game.points}</TableCell>
                    <TableCell className='text-center'>{game.rebounds}</TableCell>
                    <TableCell className='text-center'>{game.assists}</TableCell>
                    <TableCell className='text-center'> {game.steals}</TableCell>
                    <TableCell className='text-center'> {game.blocks}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        <Link color="primary" href="#" sx={{ mt: 3 }}>
            See more events
        </Link>
        </React.Fragment>
    );
}
