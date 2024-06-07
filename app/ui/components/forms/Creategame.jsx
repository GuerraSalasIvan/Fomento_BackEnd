'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function GameCreate() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [locations, setLocations] = useState([]);
    const [matchDate, setMatchDate] = useState(dayjs());
    const [selectedLeague, setSelectedLeague] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teamsRes, leaguesRes, locationsRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/team'),
                    axios.get('http://127.0.0.1:8000/api/leagues'),
                    axios.get('http://127.0.0.1:8000/api/ubications')
                ]);

                setTeams(Array.isArray(teamsRes.data.teams) ? teamsRes.data.teams : []);
                
                setLeagues(Array.isArray(leaguesRes.data) ? leaguesRes.data : []);
                setLocations(Array.isArray(locationsRes.data) ? locationsRes.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('match_date', matchDate.format('YYYY-MM-DD HH:mm:ss'));
            formData.append('local_team_id', data.local_team_id);
            formData.append('visit_team_id', data.visit_team_id);
            formData.append('league_id', data.league_id);
            formData.append('ubication_id', data.ubication_id);

            const response = await axios.post('http://localhost:8000/api/game', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            
            reset();
            router.push('/dashboard/games');
        } catch (error) {
            console.error('Error submitting game:', error);
            setError('Error submitting game');
        } finally {
            setLoading(false);
        }
    };

    const filteredTeams = selectedLeague 
        ? teams.filter((team) => team.league_id === parseInt(selectedLeague))
        : teams;

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="match_date" className="block text-sm font-medium text-gray-700">
                        Match Date
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            value={matchDate}
                            onChange={(newValue) => setMatchDate(newValue)}
                            renderInput={(params) => <input {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div>
                    <label htmlFor="league_id" className="block text-sm font-medium text-gray-700">
                        League
                    </label>
                    <select
                        id="league_id"
                        {...register('league_id', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) => setSelectedLeague(e.target.value)}
                    >
                        <option value="">Select a league</option>
                        {leagues.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="local_team_id" className="block text-sm font-medium text-gray-700">
                        Local Team
                    </label>
                    <select
                        id="local_team_id"
                        {...register('local_team_id', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a local team</option>
                        {filteredTeams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="visit_team_id" className="block text-sm font-medium text-gray-700">
                        Visit Team
                    </label>
                    <select
                        id="visit_team_id"
                        {...register('visit_team_id', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a visit team</option>
                        {filteredTeams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="ubication_id" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <select
                        id="ubication_id"
                        {...register('ubication_id', { required: true })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="">Select a location</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-menu-bg-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Game'}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}
