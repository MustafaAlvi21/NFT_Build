// QUERY SERVICES
const { countPackagesService, createPackageService } = require('./services/package-services')
const { createComissionLevelService, countComissionLevelService } = require('./services/comissionLevel-services')


const createAutoData = async () => {
    const packagesCount = await countPackagesService()
    const comissionLevelCount = await countComissionLevelService()

    if (packagesCount == 0 && comissionLevelCount == 0) {
        await createComissionLevelService({ index: 1, fees: 10, isActive: true })
        await createComissionLevelService({ index: 2, fees: 5, isActive: true })

        // await createPackageService({ _id: 0, name: 'Package 1', price: 50, stockQty: 10, URI: 'https://nft.com', description: "This package is very amazing and wonderful like in an artistic way" })
        // await createPackageService({ _id: 1, name: 'Package 2', price: 100, stockQty: 5, URI: 'https://nft2.com', description: "This package is very amazing and wonderful like in an artistic way of NFTs" })
    }
}

// try {
//     if (!process.env.Plisio_url) throw "ENV: Plisio_url NOT FOUND"
//     if (!process.env.Callback_url) throw "ENV: Callback_url NOT FOUND"
//     if (!process.env.Plisio_API_Key) throw "ENV: Plisio_API_Key NOT FOUND"
//     if (!process.env.Alchemy_API_Key) throw "ENV: Alchemy_API_Key NOT FOUND"
//     if (!process.env.Alchemy_Network) throw "ENV: Alchemy_Network NOT FOUND"
//     if (!process.env.Contract_Address) throw "ENV: Contract_Address NOT FOUND"
//     if (!process.env.ACCOUNT_PRIVATE_KEY) throw "ENV: ACCOUNT_PRIVATE_KEY NOT FOUND"

// } catch (error) {
//     console.error();
//     console.error("-- X -- X -- X -- X -- X -- X --");
//     console.error();
//     console.error(error);
//     console.error();
//     console.error("-- X -- X -- X -- X -- X -- X --");
//     process.exit()
// }




module.exports = { createAutoData }