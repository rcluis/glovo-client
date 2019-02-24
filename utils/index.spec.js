import * as utils  from '~/utils'

const store = {
    id: 7,
    schedule:
        [
            { day:0, open: "07:00", close: "19:58" },
            { day:1, open: "07:00", close: "17:00" }
        ]
}

describe('Utils', () => {
    describe('getTimeFormated', () => {
        it('retruns current date formatted', () => {
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
})