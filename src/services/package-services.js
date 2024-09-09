const Packages = require('../models/package')
const { validateAll } = require('../utils/validate')

const getPackagesService = async () => {

    try {
        return Packages.find()
    } catch (error) {
        console.error(error);
        throw error
    }
}

const createPackageService = async (data) => {
    try {
        return new Packages(data).save()

    } catch (error) {
        console.error(error);
        throw error
    }
}

const updatePackageService = async (condition, updateData) => {
    try {

        return Packages.updateOne(condition, updateData).exec()
    } catch (error) {
        console.error(error);
        throw error
    }
}

const getSinglePackageService = async (condition) => {

    try {
        return Packages.findOne(condition)
    } catch (error) {
        throw error
    }

}

const countPackagesService = async () => {

    try {
        return Packages.countDocuments()
    } catch (error) {
        throw error
    }
}


module.exports = {
    getPackagesService,
    createPackageService,
    updatePackageService,
    getSinglePackageService,
    countPackagesService

}