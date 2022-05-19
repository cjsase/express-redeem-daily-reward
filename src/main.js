import express from 'express';
import {createNewUser, getUserRewardsForWeek, redeemReward} from "./user-handlers.js";

const app = express();

const userStore = new Map();

app.get('/users/:id/rewards',(req,res) => {
    let user = userStore.get(req.params.id);
    if (!user) {
        user = createNewUser(req.params.id)
        userStore.set(user.id, user);
    }
    res.send({data: getUserRewardsForWeek(user, new Date(req.query['at']))});
})

app.patch('/users/:userId/rewards/:rewardId/redeem',(req,res) => {
    const user = userStore.get(req.params.userId)
    if (!user) {
        res.status(404);
        res.send({data: {message: 'There is no user for the given user id'}});
        return;
    }

    const reward = user.rewards.find(x => x.availableAt === req.params.rewardId);
    if (!reward) {
        res.status(404);
        res.send({data: {message: 'The requested reward does not exist'}});
        return;
    }

    try {
        redeemReward(reward);
        res.send({data: reward});
    } catch (e) {
        res.status(403);
        res.send({data: {message: e}});
    }
})

app.listen(3000,() => {
    console.log(`App listening on port 3000!`);
})