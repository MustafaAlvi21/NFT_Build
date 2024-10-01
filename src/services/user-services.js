const Users = require('../models/users')
const validate = require('../utils/validate');
const { getComissionLevelService } = require('./comissionLevel-services');



const getUsersService = async (filter = {}) => {
    try {
        console.log(filter);
        return await Users.find(filter)

    } catch (error) {
        console.error(error);
        throw error
    }
}

const createUserService = async (data) => {
    try {
        return await new Users(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}

const updateUserService = async (condition, updateData) => {
    try {

        return await Users.findOneAndUpdate(condition, updateData).exec().then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    } catch (error) {
        console.error(error);
        throw error
    }
}

const getSingleUserService = async (condition, deep = null) => {

    try {
        if (deep) {
            const comissionLevels = await getComissionLevelService({ isActive: true })
            validate.validateAll(comissionLevels, null, "Comission Level Not Found!")

            const totalActiveComissionLevels = comissionLevels.length;
            let populating = null

            function generateNestedPopulateWithLoop(depth) {
                let populate = {};
                let currentLevel = populate;

                for (let i = depth; i >= 1; i--) {
                    currentLevel.path = "referredTo.affiliate";
                    currentLevel.select = ["_id", "walletAddress", "referredTo", "referredBy", "totalComission"];

                    if (i > 1) {
                        currentLevel.populate = {};
                        currentLevel = currentLevel.populate;
                    }
                }

                return populate;
            }

            // Generate a populate object with 5 levels of nesting
            populating = generateNestedPopulateWithLoop(totalActiveComissionLevels);



            return await Users.findOne(condition).populate(populating)

        } else {
            return await Users.findOne(condition)

        }
    } catch (error) {
        console.error(error)
        throw error
    }

}




module.exports = {
    getUsersService,
    createUserService,
    updateUserService,
    getSingleUserService
}