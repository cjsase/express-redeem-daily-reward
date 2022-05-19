import {getUserRewardsForWeek, redeemReward} from "./user-handlers.js";
import {getISO8601DateString} from "./date-handlers.js";

describe('getUserRewardsForWeek', () => {
    it('should get rewards when not existing and set expiredAt correctly', () => {
        const mockUser = {
            id: 1
        };
        expect(getUserRewardsForWeek(mockUser, new Date('2020-03-19T12:00:00Z'))).toEqual([
            {availableAt: "2020-03-15T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-16T00:00:00Z"},
            {availableAt: "2020-03-16T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-17T00:00:00Z"},
            {availableAt: "2020-03-17T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-18T00:00:00Z"},
            {availableAt: "2020-03-18T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-19T00:00:00Z"},
            {availableAt: "2020-03-19T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-20T00:00:00Z"},
            {availableAt: "2020-03-20T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-21T00:00:00Z"},
            {availableAt: "2020-03-21T00:00:00Z", redeemedAt: null, expiredAt: "2020-03-22T00:00:00Z"}
        ]);
    });

    it('should get rewards when partially existing and store new entries in user', () => {
        const mockUser = {
            id: 1,
            rewards: [
                {availableAt: "2020-03-20T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
                {availableAt: "2020-03-21T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
                {availableAt: "2020-03-22T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            ]
        };
        expect(getUserRewardsForWeek(mockUser, new Date('2020-03-19T12:00:00Z'))).toEqual([
            {availableAt: "2020-03-15T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-16T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-17T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-18T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-19T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-20T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)},
            {availableAt: "2020-03-21T00:00:00Z", redeemedAt: null, expiredAt: jasmine.any(String)}
        ]);

        // one additional out of range object exists in mock
        expect(mockUser.rewards.length).toEqual(8);
    });
});

describe('redeemReward', () => {
    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date(2022, 4, 19, 12));
    })
    afterEach(function () {
        jasmine.clock().uninstall();
    });
    it('should fail when requesting too early', () => {
        const mockReward = {
            availableAt: "2023-05-19T00:00:00Z",
            redeemedAt: null,
            expiredAt: jasmine.any(String)
        };
        expect(() => redeemReward(mockReward)).toThrow(jasmine.any(String));
    });

    it('should fail when requesting too late', () => {
        const mockReward = {
            availableAt: "2021-05-19T00:00:00Z",
            redeemedAt: null,
            expiredAt: "2021-05-20T00:00:00Z"
        };
        expect(() => redeemReward(mockReward)).toThrow(jasmine.any(String));
    });

    it('should return the reward object on success', () => {
        const mockReward = {
            availableAt: "2022-05-19T00:00:00Z",
            redeemedAt: null,
            expiredAt: "2022-05-20T00:00:00Z"
        };
        const expectedReward = {...mockReward, redeemedAt: getISO8601DateString(new Date())};
        redeemReward(mockReward);
        expect(mockReward).toEqual(expectedReward);
    });
});