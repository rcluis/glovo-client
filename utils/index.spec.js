import * as utils  from './index'

const store = {
    id: 7,
    schedule:
        [
            { day: 0, open: "07:00", close: "19:58" },
            { day: 1, open: "07:00", close: "17:00" },
            { day: 6, open: "08:10", close: "19:00" }
        ]
}

describe('Utils', () => {
    describe('getTimeFormated', () => {
        it('returns current date formatted', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(1)
            spyOn(Date.prototype, 'getHours').and.returnValue('18')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('1')
            expect(utils.getTimeFormated()).toEqual({ day: 1, time: '18:01' })
        })
    })

    describe('isStoreOpen', () => {
        beforeEach(() => {
            spyOn(Date.prototype, 'getHours').and.returnValue('18')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
        })

        it('store is opened', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(1)
            expect(utils.isStoreOpen(store)).toBeFalsy()
        })

        it('store is closed', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(0)
            expect(utils.isStoreOpen(store)).toBeTruthy()
        })
    })

    describe('getNextOpeningTime', () =>  {
        it('next opening time is same day open time', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(1)
            spyOn(Date.prototype, 'getHours').and.returnValue('06')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toEqual({ day: 1, time: '07:00' })
        })

        it('next opening time is same week next day open time', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(1)
            spyOn(Date.prototype, 'getHours').and.returnValue('18')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toEqual({ day: 6, time: '08:10' })
        })

        it('next opening time is next week first day open time', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(6)
            spyOn(Date.prototype, 'getHours').and.returnValue('20')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toEqual({ day: 0, time: '07:00' })
        })

        it('next opening time is next day when today is no open', () => {
            spyOn(Date.prototype, 'getDay').and.returnValue(2)
            spyOn(Date.prototype, 'getHours').and.returnValue('18')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toEqual({ day: 6, time: '08:10' })
        })

        it('next opening time is same day when there is just one opening day', () => {
            const store = {
                id: 7,
                schedule: [
                    { day: 0, open: "07:00", close: "19:58" }
                ]
            }
            spyOn(Date.prototype, 'getDay').and.returnValue(0)
            spyOn(Date.prototype, 'getHours').and.returnValue('20')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toEqual({ day: 0, time: '07:00' })
        })
        it('next opening time is false when store has no schedule', () => {
            const store = {
                id: 7,
                schedule: []
            }
            spyOn(Date.prototype, 'getDay').and.returnValue(2)
            spyOn(Date.prototype, 'getHours').and.returnValue('18')
            spyOn(Date.prototype, 'getMinutes').and.returnValue('0')
            expect(utils.getNextOpeningTime(store)).toBeFalsy()
        })
    })

    describe('formatDayToString', () =>  {
        it('returns day formatted to string', () => {
            expect(utils.formatDayToString(0)).toEqual('Sunday')
        })
    })
})
