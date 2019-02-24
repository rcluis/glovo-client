const getTimeFormated = () => {
    // I have used date because the day first day (1) is monday otherwise I would have use moment to change the starting day
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    return { day: date.getDay(), time }
}
const isStoreOpen = ({ schedule }) => {
    const { day: currentDay, time: currentTime } = getTimeFormated()
    let todaySchedule = schedule.find(({ day }) => currentDay === day)
    if (todaySchedule === undefined) {
        return false
    }
    const { open, close } = todaySchedule
    return open <= currentTime && close >= currentTime
}

const getNextOpeningTime = ({ schedule }) => {
    const { day: currentDay } = getTimeFormated()
}
export {
    isStoreOpen,
    getTimeFormated,
    getNextOpeningTime
}