
export default {

validateTrainingTimes(startTime, endTime){
    const parseTimeToMinutes = (timeStr) => {
        if (!timeStr) return -1; // Handle empty string
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };
    const startMinutes = parseTimeToMinutes(startTime);
    const endMinutes = parseTimeToMinutes(endTime);

    if (startMinutes === -1 || endMinutes === -1) {
        return false;
    }

    if (startMinutes > endMinutes) {
        return false;
    }
    return true;
}

};