
export default {


    const parseTimeToMinutes = (timeStr) => {
        if (!timeStr) return -1; // Handle empty string
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const startMinutes = parseTimeToMinutes(this.addNewTraining.startTime);
    const endMinutes = parseTimeToMinutes(this.addNewTraining.endTime);

    if (startMinutes === -1 || endMinutes === -1) {
    this.setTimedOutErrorMessage('Sisesta kehtiv algus- ja lõppaeg');
    return false;
}

if (startMinutes > endMinutes) {
    this.setTimedOutErrorMessage('Trenn ei saa lõppeda ennem kui algab');
    return false;
}
}