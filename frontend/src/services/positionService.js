import axios from 'axios';

export const fetchAllPositions = async () => {
    try {
        const response = await axios.get('/positions');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching positions:', error.response.data);
    }
};

export const addPosition = async (positionData) => {
    try {
        const response = await axios.post('/positions', positionData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding position:', error.response.data);
    }
};

export const updatePosition = async (positionId, positionData) => {
    try {
        const response = await axios.patch(`/positions/${positionId}`, positionData);
        return response.data;
    } catch (error) {
        throw new Error('Error updating position:', error.response.data);
    }
};

export const deletePosition = async (positionId) => {
    try {
        const response = await axios.delete(`/positions/${positionId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting position:', error.response.data);
    }
};
