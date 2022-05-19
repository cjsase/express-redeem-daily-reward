import {getDaysOfWeek, getISO8601DateString, getNextDay} from "./date-handlers.js";

/**
 * @member {number} id
 * @member {Reward[]} rewards
 */
export class User {
    id;
    rewards;
}

/**
 * @member {string} availableAt
 * @member {string} redeemedAt
 * @member {string} expiredAt
 */
export class Reward {
    availableAt;
    redeemedAt;
    expiredAt;
}

// The classes above are only used to make JSDoc more readable, these should be interfaces when using Typescript

/**
 * create empty user object
 *
 * @param {number} id
 * @returns {User}
 */
export const createNewUser = id => {
    return {id, rewards: []};
};

/**
 * get available rewards of a user for a given week
 * also creates missing rewards automatically
 *
 * @param {User} user
 * @param {Date} date
 * @returns {Reward[]}
 */
export const getUserRewardsForWeek = (user, date) => {
    const rewardList = [];

    // prevent error if reward list may not have been initialized correctly
    if (user.rewards == null) {
        user.rewards = [];
    }

    // get rewards from user or create new, if not existing for a given date
    getDaysOfWeek(date).forEach(day => {
        let reward = user.rewards.find(reward => reward.availableAt === day);
        if (!reward) {
            reward = {availableAt: day, redeemedAt: null, expiredAt: getNextDay(new Date(day))};
            user.rewards.push(reward);
        }
        rewardList.push(reward);
    })
    return rewardList;
};

/**
 * redeem a reward if within range
 *
 * @param {Reward} reward
 * @returns {Reward}
 * @throws {string}
 */
export const redeemReward = reward => {
    const currentDate = new Date();
    if (new Date(reward.availableAt).valueOf() > currentDate.valueOf()) {
        throw 'This reward is not yet available';
    }
    if (new Date(reward.expiredAt).valueOf() < currentDate.valueOf()) {
        throw 'This reward is already expired';
    }
    reward.redeemedAt = getISO8601DateString(currentDate);
}