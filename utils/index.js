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
    if (schedule.length === 0){
        return false;
    }
    const { day: currentDay, time: currentTime } = getTimeFormated()

    const findStoreIndex = (schedule) => {
        let storeIndex;
        for (let i = 0; i <= 6 - currentDay; i ++) {
            storeIndex = schedule.findIndex(({ day }) => day === currentDay + i)
            if (storeIndex !== -1) {
                const { day: storeDay, open: storeOpen } = schedule[storeIndex]
                const storeWillOpenToday = currentDay === storeDay && currentTime <= storeOpen
                if (storeWillOpenToday || currentDay !== storeDay) {
                    break
                }
            }
        }
        return storeIndex
    }

    const storeIndex = findStoreIndex(schedule)
    const storeAlreadyClosedToday = currentDay === schedule[storeIndex].day && currentTime >= schedule[storeIndex].close
    if (storeIndex === -1 || storeAlreadyClosedToday) {
        return { day: schedule[0].day, time: schedule[0].open }
    }

    const { day, open } = schedule[storeIndex]

    return { day: day, time: open }
}

export {
    isStoreOpen,
    getTimeFormated,
    getNextOpeningTime
}
